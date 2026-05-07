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
		}),
	}),
};
