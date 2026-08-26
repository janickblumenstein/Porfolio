// =============================================================================
//  Verfügbarkeit der Lebenslauf-PDFs
//  ---------------------------------------------------------------------------
//  Die PDFs entstehen über `npm run cv:pdf` (siehe scripts/generate-cv-pdf.mjs)
//  und liegen dann unter public/documents/. Existieren sie noch nicht, werden
//  die Download-Buttons ausgeblendet, statt auf einen toten Link zu zeigen.
//  Die Prüfung läuft ausschliesslich beim Build — im Browser landet sie nie.
// =============================================================================

import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Bewusst über das Arbeitsverzeichnis statt über import.meta.url: Astro bündelt
// diese Datei beim Build nach dist/.prerender/chunks/, wodurch ein relativer
// Pfad ins Leere zeigen würde. `astro dev` und `astro build` laufen beide im
// Projektstamm.
const publicDir = join(process.cwd(), 'public');

function asset(href: string) {
	return { href, exists: existsSync(join(publicDir, href)) };
}

/** Gestaltete Fassung — die Datei, die man einer Bewerbung beilegt. */
export const cvPdf = asset('/documents/lebenslauf-janick-blumenstein.pdf');

/** Textfassung für Bewerbungssysteme. */
export const cvPdfAts = asset('/documents/lebenslauf-janick-blumenstein-ats.pdf');
