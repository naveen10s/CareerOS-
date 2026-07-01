import { z } from "zod";

export const LinkedinSchema = z.object({
  headline: z.string(),
  about: z.string(),
  experience: z.array(
    z.object({
      id: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
  featured: z.array(z.string()),
});
