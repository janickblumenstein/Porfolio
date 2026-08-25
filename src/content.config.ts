import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),

			// NEU: pro Projekt eine Liste von Sticky-Showcase-Szenen.
			// Optional — wenn weggelassen, erscheint keine Showcase-Sektion.
			showcases: z
				.array(
					z.object({
						title: z.string(),
						description: z.string(),
						media: z.string().optional(),
						mediaType: z.enum(['image', 'video']).optional(),
						mediaFallback: z.string().optional(),
						mediaFallbackType: z.enum(['image', 'video']).optional(),
						alt: z.string().optional(),
						dimensions: z.string().optional(),
						format: z.string().optional(),
					})
				)
				.optional(),

			// NEU: Aspect Ratio für die Showcase auf der Detailseite (z.B. '9 / 16' für Mobile).
			showcaseAspectRatio: z.string().optional(),

			// Privates Projekt: Dieser Block macht aus einem Eintrag zusätzlich einen
			// Lebenslauf-Eintrag. Steht er hier, erscheint das Projekt automatisch im
			// CV (beide Fassungen) und in der Sektion "Aus eigenem Antrieb" auf der
			// Startseite — ohne dass die Angaben irgendwo ein zweites Mal gepflegt
			// werden müssen. Siehe DOKUMENTATION.md.
			sideProject: z
				.object({
					/** Kurzname für den CV. Fehlt er, wird `title` verwendet. */
					name: z.string().optional(),
					/** Zeitraum, z.B. 'seit 2026' oder '2026'. */
					period: z.string(),
					/** Eigene Rolle, z.B. 'Konzeption & Entwicklung'. */
					role: z.string(),
					/** Einzeiler für die ATS-Fassung — ohne Formatierung. */
					cvLine: z.string(),
					/** Stichpunkte; im gestalteten CV werden die ersten drei gezeigt. */
					bullets: z.array(z.string()),
					/** Eingesetzte Technologien, in sinnvoller Reihenfolge. */
					stack: z.array(z.string()),
					liveUrl: z.string().url().optional(),
					repoUrl: z.string().url().optional(),
					/** Kleinere Zahl erscheint weiter oben. Ohne Angabe: 100. */
					order: z.number().optional(),
				})
				.optional(),
		}),
	}),
};
