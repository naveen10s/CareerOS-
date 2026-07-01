import { z } from "zod";

export const ExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  timeline: z.object({
    start: z.string(),
    end: z.string(),
    isCurrent: z.boolean(),
  }),
  responsibilities: z.array(z.string()),
  achievements: z.array(z.string()),
  businessImpact: z.array(z.string()),
  technologies: z.array(z.string()),
  stakeholders: z.array(z.string()),
  metrics: z.array(z.string()),
});

export const ExperienceSchema = z.array(ExperienceItemSchema);
