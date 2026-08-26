// =============================================================================
//  Private Projekte aus der Content Collection lesen
//  ---------------------------------------------------------------------------
//  Ein privates Projekt wird an genau einer Stelle gepflegt: in seiner
//  Markdown-Datei unter src/content/work/. Sobald dort ein `sideProject`-Block
//  im Frontmatter steht, erscheint das Projekt automatisch
//    · im gestalteten Lebenslauf   (/cv/)
//    · in der ATS-Fassung          (/cv/ats/)
//    · in der Sektion "Aus eigenem Antrieb" auf der Startseite
//    · als Detailseite             (/work/<slug>/)
//  Siehe DOKUMENTATION.md.
// =============================================================================

import { getCollection } from 'astro:content';

export interface SideProject {
	/** Kurzname für CV und Karten. */
	name: string;
	/** Vollständiger Titel der Detailseite. */
	title: string;
	slug: string;
	period: string;
	role: string;
	summary: string;
	cvLine: string;
	bullets: string[];
	stack: string[];
	liveUrl?: string;
	repoUrl?: string;
}

export async function getSideProjects(): Promise<SideProject[]> {
	const entries = await getCollection('work');

	return entries
		.filter((entry) => entry.data.sideProject)
		.sort((a, b) => {
			const orderDiff = (a.data.sideProject!.order ?? 100) - (b.data.sideProject!.order ?? 100);
			if (orderDiff !== 0) return orderDiff;
			return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
		})
		.map((entry) => {
			const side = entry.data.sideProject!;
			return {
				name: side.name ?? entry.data.title,
				title: entry.data.title,
				slug: entry.id,
				period: side.period,
				role: side.role,
				// Die Beschreibung stammt aus dem gemeinsamen `description`-Feld,
				// damit sie nicht zweimal gepflegt werden muss.
				summary: entry.data.description.trim(),
				cvLine: side.cvLine,
				bullets: side.bullets,
				stack: side.stack,
				liveUrl: side.liveUrl,
				repoUrl: side.repoUrl,
			};
		});
}
