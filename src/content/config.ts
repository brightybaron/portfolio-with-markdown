import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    location: z.string(),
    publishDate: z.string(),
    images: z.array(
      z.object({
        url: z.string(),
      })
    ),
    description: z.string(),
  }),
});

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    category: z.string(),
    site: z.string().optional(),
    location: z.string().optional(),
    publishDate: z.string(),
    images: z.array(
      z.object({
        url: z.string(),
      })
    ),
    description: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  posts: postsCollection,
};
