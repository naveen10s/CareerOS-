import { z } from "zod";

export const InterviewItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  starStories: z.object({
    situation: z.string(),
    task: z.string(),
    action: z.string(),
    result: z.string(),
  }),
  category: z.enum(["behavioral", "pm", "ba", "leadership", "product-design"]),
});

export const InterviewsSchema = z.array(InterviewItemSchema);
