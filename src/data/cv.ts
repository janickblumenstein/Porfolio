// =============================================================================
//  CV DATA — SINGLE SOURCE OF TRUTH
//  ---------------------------------------------------------------------------
//  All pages (Hero on index, About, CV) import from this file. Edit here →
//  changes propagate everywhere automatically. No more double-maintenance.
// =============================================================================

// -----------------------------------------------------------------------------
//  Personal & contact
// -----------------------------------------------------------------------------

export const personal = {
	firstName: 'Janick',
	lastName: 'Blumenstein',
	fullName: 'Janick Blumenstein',
	title: 'Wirtschaftsingenieur FH · IT Operations Project Manager',
	birthDate: '12.07.1992',
	family: 'verheiratet, 3 Kinder',
	nationality: 'Schweiz',
} as const;

export const location = {
	street: 'Altachenring 2',
	zip: '4805',
	city: 'Brittnau',
	region: 'AG',
	country: 'Schweiz',
} as const;

export const contact = {
	email: 'janick.blumenstein@gmail.com',
	phone: '+41 78 888 29 73',
	phoneRaw: '+41788882973',
	linkedin: 'https://www.linkedin.com/in/janick-blumenstein-b545a1133/',
	github: 'https://github.com/janickblumenstein',
	website: 'https://www.buildwithjanick.dev',
	websiteLabel: 'buildwithjanick.dev',
} as const;

// -----------------------------------------------------------------------------
//  Profile / Tagline
// -----------------------------------------------------------------------------

export const tagline =
	'Wirtschaftsingenieur FH und IT Operations Project Manager aus Brittnau, AG. Ich verbinde Operations-Verständnis mit Microsoft Power Platform, um Prozesse messbar zu vereinfachen — und baue nebenbei eigene Apps von Grund auf.';

export const profile =
	'Wirtschaftsingenieur FH mit Vertiefung Operations Management und über zehn Jahren Berufserfahrung — vom Konstrukteur über den strategischen Einkauf bis zur heutigen Projektleitung in IT und Operations. Spezialisiert auf Microsoft Power Platform, Microsoft 365-Administration sowie die Konzeption, Automatisierung und Einführung digitaler Geschäftsprozesse. Ergänzend dazu entwickle ich in der Freizeit produktiv genutzte Web- und Android-Apps mit Next.js, React, TypeScript und Firebase — von der Datenmodellierung über die Hardware-Anbindung bis zum Deployment. Verhandlungssicher in Deutsch und Englisch.';

// -----------------------------------------------------------------------------
//  Berufserfahrung
// -----------------------------------------------------------------------------

export interface Experience {
	startDate: string;
	endDate: string;
	current?: boolean;
	role: string;
	organization: string;
	location: string;
	bullets?: string[];
}

export const experience: Experience[] = [
		{
		startDate: '03/2026',
		endDate: 'heute',
		current: true,
		role: 'IT Operations Project Manager',
		organization: 'Müller Martini AG',
		location: 'Zofingen',
		bullets: [
			'Einführung dynamisches Request Center für offizielle Anfragen jeglicher Art, skalierbar und vollautomatisiert. Inklusive Freigaben, Versionsverwaltung und Ablage',
			'Begleitung SAP BTP Prozesse zur Automatisierung von Pull- und Push-Requests mit Externen',
			'Betreuung DAM und PIM – Portal mit Benutzerverwaltung und automatisiertem Reporting',
			'Leitung mehrerer Digitalisierungsprojekte von Konzeption bis Rollout',

		],
	},
	{
		startDate: '01/2024',
		endDate: '03/2026',
		current: false,
		role: 'Projektleiter Digitalisierung',
		organization: 'Müller Martini Wikon (ehemalig Hunkeler AG Paper Processing)',
		location: 'Wikon',
		bullets: [
			'Einführung von Mitarbeiter- und Servicetechniker-Apps (Ferienplanung, Zeiterfassung, Reporting) via Power Apps',
			'Umsetzung digitaler Anfragetools und SharePoint-Auswertungen',
			'Automatisierung von Prozessen (Absenzmeldungen, KVP)',
			'Leitung mehrerer Digitalisierungsprojekte von Konzeption bis Rollout',
		],
	},
	{
		startDate: '04/2018',
		endDate: '12/2023',
		role: 'Buyer Strategischer Einkauf',
		organization: 'Franke Kaffeemaschinen AG',
		location: 'Aarburg',
		bullets: [
			'Verhandlung von Preislisten und strategisches Lieferantenmanagement',
			'Leitung von Digitalisierungsprojekten mit Microsoft Power Platform',
			'Automatisierung und Optimierung von Geschäftsprozessen',
			'Erstellung von Reports und Dashboards (Power BI)',
			'Integration von Microsoft 365-Lösungen in bestehende Abläufe',
		],
	},
	{
		startDate: '09/2014',
		endDate: '03/2018',
		role: 'Konstrukteur Forschung & Entwicklung',
		organization: 'Franke Kaffeemaschinen AG',
		location: 'Aarburg',
		bullets: [
			'Entwicklung von Bauteilen und Baugruppen',
			'Ausarbeitung von technischen Anforderungen',
			'Technische Teilprojektverantwortung',
		],
	},
	{
		startDate: '10/2013',
		endDate: '08/2014',
		role: 'Durchdiener Rettungstruppen',
		organization: 'Schweizer Armee',
		location: 'Schweiz',
		bullets: ['Dienstpflicht erfüllt'],
	},
	{
		startDate: '09/2012',
		endDate: '09/2013',
		role: 'CAD Engineer (Praktikum)',
		organization: 'Franke Foodservice Systems Inc.',
		location: 'Smyrna, TN, USA',
	},
	{
		startDate: '2008',
		endDate: '2012',
		role: 'Lehre Konstrukteur EFZ',
		organization: 'Franke Schweiz AG',
		location: 'Aarburg',
		bullets: ['inkl. 6 Monate Werkstattpraktikum'],
	},
];

// -----------------------------------------------------------------------------
//  Aus- und Weiterbildung
// -----------------------------------------------------------------------------

export interface Education {
	startDate: string;
	endDate: string;
	title: string;
	organization: string;
	bullets?: string[];
}

export const education: Education[] = [
	{
		startDate: 'aktuell',
		endDate: '',
		title: 'Microsoft Power Platform & M365 Administration',
		organization: 'Vorbereitung Microsoft PL-600 (Power Platform Solution Architect) · Microsoft Learn',
	},
	{
		startDate: '02/2017',
		endDate: '01/2022',
		title: 'Wirtschaftsingenieur Innovation FH',
		organization: 'HSLU Technik & Architektur, Horw · Vertiefung Operations Management',
		bullets: [
			'Schwerpunkte: Digital Business Process Engineering, Supply Chain Management, Operational Excellence',
			'Strategisches- und Produktmanagement, Statistical & Quantitative Data Analysis',
			'Innovation Financing, Controlling, Development Excellence',
			'Bachelorarbeit: Digitalization in Strategic Procurement',
		],
	},
	{
		startDate: '2008',
		endDate: '2012',
		title: 'Technische Berufsmaturität',
		organization: 'Berufs- und Weiterbildung Zofingen',
	},
];

// -----------------------------------------------------------------------------
//  Kernkompetenzen
//  ---------------------------------------------------------------------------
//  level: 1–5 (für mögliche visuelle Darstellung mit Punkten/Balken).
//  In der ATS-CV-Ansicht werden nur die Namen ausgegeben (ATS-freundlich).
// -----------------------------------------------------------------------------

export interface SkillItem {
	name: string;
	level?: 1 | 2 | 3 | 4 | 5;
}

export interface SkillGroup {
	title: string;
	items: SkillItem[];
}

export const skills: SkillGroup[] = [
	{
		title: 'Microsoft Power Platform',
		items: [
			{ name: 'Power Apps', level: 4 },
			{ name: 'Power Automate', level: 4 },
			{ name: 'Power BI', level: 4 },
			{ name: 'Dataverse', level: 3 },
		],
	},
	{
		title: 'Microsoft 365',
		items: [
			{ name: 'SharePoint Online', level: 4 },
			{ name: 'Excel inkl. VBA', level: 4 },
			{ name: 'Teams & Office', level: 5 },
			{ name: 'M365 Administration', level: 3 },
		],
	},
	{
		title: 'ERP-Systeme',
		items: [
			{ name: 'SAP FOX', level: 4 },
			{ name: 'ProAlpha', level: 3 },
			{ name: 'IFS', level: 3 },
			{ name: 'ECTR', level: 4 },
		],
	},
	{
		title: 'Daten & Reporting',
		items: [
			{ name: 'Power BI', level: 4 },
			{ name: 'QlikSense', level: 3 },
			{ name: 'Datenmodellierung', level: 4 },
			{ name: 'Schnittstellenintegration', level: 3 },
		],
	},
	{
		title: 'Softwareentwicklung',
		items: [
			{ name: 'TypeScript / JavaScript', level: 3 },
			{ name: 'React & Next.js', level: 3 },
			{ name: 'Firebase (Firestore & Realtime DB)', level: 3 },
			{ name: 'Git & GitHub', level: 3 },
			{ name: 'Capacitor (Android-Builds)', level: 2 },
		],
	},
	{
		title: 'Methoden',
		items: [
			{ name: 'Prozessdigitalisierung', level: 5 },
			{ name: 'Low-Code-Entwicklung', level: 4 },
			{ name: 'Automatisierung', level: 4 },
			{ name: 'Lean / Operational Excellence', level: 4 },
			{ name: 'Projektmanagement', level: 4 },
		],
	},
	{
		title: 'Weitere Tools',
		items: [
			{ name: 'Adobe Suite (InDesign, Illustrator, Photoshop)', level: 3 },
			{ name: 'CAD (diverse Systeme)', level: 3 },
		],
	},
];

/** Beschriftung der Skill-Level 1–5 — Legende in der Human-Variante des CV. */
export const skillLevelLabels: Record<1 | 2 | 3 | 4 | 5, string> = {
	1: 'Grundkenntnisse',
	2: 'Anwendungserfahrung',
	3: 'Fortgeschritten',
	4: 'Sehr gut',
	5: 'Experte',
};

// -----------------------------------------------------------------------------
//  Private Projekte
//  ---------------------------------------------------------------------------
//  Stehen NICHT hier, sondern im Frontmatter der jeweiligen Markdown-Datei
//  unter src/content/work/ (Block `sideProject`). Ausgelesen werden sie über
//  getSideProjects() aus src/lib/projects.ts — so wird jedes Projekt an genau
//  einer Stelle gepflegt. Siehe DOKUMENTATION.md.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//  Sprachen
// -----------------------------------------------------------------------------

export interface Language {
	language: string;
	level: string;
	dots: 1 | 2 | 3 | 4 | 5;
}

export const languages: Language[] = [
	{ language: 'Deutsch', level: 'Muttersprache', dots: 5 },
	{ language: 'Englisch', level: 'verhandlungssicher (mündlich & schriftlich)', dots: 5 },
	{ language: 'Französisch', level: 'mündlich & schriftlich', dots: 3 },
	{ language: 'Italienisch', level: 'Grundkenntnisse mündlich', dots: 2 },
];

// -----------------------------------------------------------------------------
//  Zusätzliche Angaben (für CV "Weitere Angaben"-Sektion und Hero-Status)
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//  Dokumente (Arbeitszeugnisse, Diplome, Zertifikate)
//  ---------------------------------------------------------------------------
//  Neues Dokument aufschalten:
//    1. PDF nach public/documents/ legen, z.B. public/documents/zeugnis-franke.pdf
//    2. Hier einen Eintrag mit `file: '/documents/zeugnis-franke.pdf'` ergänzen
//  Ohne `file` erscheint der Eintrag als "auf Anfrage" — nichts wird verlinkt.
//  Solange die Liste leer ist, blendet sich die Dokumente-Seite selbst aus.
// -----------------------------------------------------------------------------

export type DocumentCategory = 'Arbeitszeugnis' | 'Diplom' | 'Zertifikat';

export interface DocumentEntry {
	title: string;
	category: DocumentCategory;
	issuer: string;
	date: string;
	/** Pfad unter /public. Fehlt er, gilt das Dokument als "auf Anfrage". */
	file?: string;
}

export const documents: DocumentEntry[] = [];

/** Steuert, ob /dokumente überhaupt verlinkt wird. */
export const hasPublicDocuments = documents.some((doc) => doc.file);

export const meta = {
	drivingLicense: 'Kat. B, C1E',
	availability: '100%',
	availabilityShort: '100% ab 01.09.2026',
	noticePeriod: '3 Monate',
	references: 'auf Wunsch',
	interests: 'Technik & Heimwerken, Sport, ehrenamtliche Mitarbeit',
} as const;
