import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

// Define the blog collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
  }),
})

export const collections = { blog }
