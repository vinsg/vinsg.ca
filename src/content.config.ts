// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Define collections using the new Content Layer API
const postsCollection = defineCollection({
  loader: glob({ 
    pattern: "**/*.{md,mdx}", 
    base: "./src/content/posts" 
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string(),
    // image: z.object({
    //   url: z.string(),
    //   alt: z.string()
    // }),
    tags: z.array(z.string()),
    draft: z.boolean().optional()
  })
});

const notesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/notes"
  }),
  schema: z.object({
    pubDate: z.coerce.date(),
    type: z.enum(["note", "link", "quote"]).default("note"),
    url: z.string().url().optional(),
    quote: z.string().optional(),
    source: z.string().optional(),
    draft: z.boolean().optional(),
  })
});

const slidesCollection = defineCollection({
  loader: glob({ 
    pattern: "**/*.{md,mdx}", 
    base: "./src/content/slides" 
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().optional()
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  notes: notesCollection,
  slides: slidesCollection
};