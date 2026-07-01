import { z } from "zod";

export const SkillItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum([
    "product-management",
    "business-analysis",
    "technical",
    "analytics",
    "leadership",
    "soft-skills",
    "ai",
    "databases",
    "programming",
    "cloud",
  ]),
  description: z.string(),
  level: z.number().min(1).max(5),
  years: z.number(),
  projects: z.array(z.string()).optional().default([]),
  experience: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  tools: z.array(z.string()).optional().default([]),
  evidence: z.array(z.string()).optional().default([]),
  learningStatus: z.enum(["mastered", "learning", "planned"]).optional().default("mastered"),
  certifications: z.array(z.string()).optional().default([]),
  relatedSkills: z.array(z.string()).optional().default([]),
  color: z.string().optional().default("primary"),
});

export const SkillsSchema = z.array(SkillItemSchema);
