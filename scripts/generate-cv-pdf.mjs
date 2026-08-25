// =============================================================================
//  Lebenslauf als PDF erzeugen
//  ---------------------------------------------------------------------------
//  Rendert die beiden CV-Seiten aus dem fertigen Build (dist/) in echte
//  PDF-Dateien und legt sie unter public/documents/ ab.
//
//  Aufruf:  npm run cv:pdf
//
//  Der Ablauf im npm-Script ist bewusst: bauen → PDF erzeugen → erneut bauen.
//  Der zweite Build ist nötig, damit die Download-Buttons erscheinen — sie
//  werden nur gerendert, wenn die PDF-Datei zum Build-Zeitpunkt existiert.
//
//  Voraussetzung einmalig:  npx playwright install chromium
// =============================================================================

import { createServer } from 'node:http';
import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const distDir = join(root, 'dist');
const publicDocs = join(root, 'public', 'documents');
const distDocs = join(distDir, 'documents');

const targets = [
	{ path: '/cv/', file: 'lebenslauf-janick-blumenstein.pdf' },
	{ path: '/cv/ats/', file: 'lebenslauf-janick-blumenstein-ats.pdf' },
];

const mimeTypes = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.woff2': 'font/woff2',
	'.ico': 'image/x-icon',
	'.pdf': 'application/pdf',
};

if (!existsSync(distDir)) {
	console.error('Kein dist/-Ordner gefunden. Bitte zuerst "npm run build" ausführen.');
	process.exit(1);
}

// --- Minimaler statischer Server über dist/ -----------------------------------

const server = createServer(async (req, res) => {
	try {
		// Query-String abschneiden und Pfad-Traversal ausschliessen.
		const urlPath = decodeURIComponent(req.url.split('?')[0]);
		const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
		let filePath = join(distDir, safePath);
		if (!filePath.startsWith(distDir)) {
			res.writeHead(403).end('Forbidden');
			return;
		}
		if (filePath.endsWith('/') || !extname(filePath)) {
			filePath = join(filePath, 'index.html');
		}
		const body = await readFile(filePath);
		res.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] ?? 'application/octet-stream' });
		res.end(body);
	} catch {
		res.writeHead(404).end('Not found');
	}
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

// --- Rendern ------------------------------------------------------------------

let chromium;
try {
	({ chromium } = await import('playwright'));
} catch {
	console.error(
		'Playwright ist nicht installiert.\n' +
			'  npm install --save-dev playwright\n' +
			'  npx playwright install chromium',
	);
	server.close();
	process.exit(1);
}

await mkdir(publicDocs, { recursive: true });
await mkdir(distDocs, { recursive: true });

// Normalfall: Playwright findet seinen eigenen Browser. Umgebungen mit einem
// vorinstallierten Chromium (z. B. CI-Container) können über CHROMIUM_EXECUTABLE
// einen Pfad vorgeben.
const executablePath = process.env.CHROMIUM_EXECUTABLE;
let browser;
try {
	browser = await chromium.launch(executablePath ? { executablePath } : {});
} catch (error) {
	console.error(
		'Chromium konnte nicht gestartet werden.\n' +
			'  npx playwright install chromium\n' +
			'Alternativ einen vorhandenen Browser vorgeben:\n' +
			'  CHROMIUM_EXECUTABLE=/pfad/zu/chrome npm run cv:pdf\n\n' +
			String(error.message ?? error),
	);
	server.close();
	process.exit(1);
}

try {
	for (const { path, file } of targets) {
		const page = await browser.newPage();
		const response = await page.goto(baseUrl + path, { waitUntil: 'networkidle' });
		if (!response?.ok()) {
			throw new Error(`${path} lieferte HTTP ${response?.status()}`);
		}
		// Sicherstellen, dass die selbst gehosteten Schriften geladen sind —
		// sonst landet eine Ersatzschrift im PDF.
		await page.evaluate(() => document.fonts.ready);

		const target = join(publicDocs, file);
		await page.pdf({ path: target, format: 'A4', printBackground: true });
		await copyFile(target, join(distDocs, file));
		await page.close();
		console.log(`  ${path.padEnd(10)} → public/documents/${file}`);
	}
} finally {
	await browser.close();
	server.close();
}

console.log('\nPDFs erzeugt. Beim nächsten Build erscheinen die Download-Buttons.');
