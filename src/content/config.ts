// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a schema for each collection you'd like to validate.
const postsCollection = defineCollection({
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
const slidesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().optional()
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  slides: slidesCollection
};