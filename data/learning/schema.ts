import { z } from "zod";

export const LearningSchema = z.object({
  courses: z.array(z.string()),
  books: z.array(
    z.object({
      title: z.string(),
      author: z.string(),
      status: z.enum(["reading", "completed", "backlog"]),
    }),
  ),
  certifications: z.array(z.string()),
  roadmap: z.array(z.string()),
});
