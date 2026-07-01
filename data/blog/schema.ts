import { z } from "zod";

export const BlogArticleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
});

export const BlogSchema = z.array(BlogArticleSchema);
