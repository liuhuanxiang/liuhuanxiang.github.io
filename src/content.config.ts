import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
    historical: z.boolean().default(false),
    assistance: z.string().optional(),
    permalink: z.string().regex(/^\/[a-z0-9/-]+\/$/).optional(),
  }),
});

export const collections = { posts };
