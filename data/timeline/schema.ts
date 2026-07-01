import { z } from "zod";

export const TimelineItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  category: z.enum([
    "experience",
    "education",
    "internship",
    "founder",
    "certification",
    "learning",
  ]),
  description: z.string(),
  achievements: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  skills: z.array(z.string()).optional().default([]),
  milestone: z.boolean().optional().default(false),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    )
    .optional()
    .default([]),
  status: z.enum(["current", "past", "future"]).optional().default("past"),
});

export const TimelineSchema = z.array(TimelineItemSchema);
