import { z } from "zod";

export const ProjectItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  status: z.string(),
  duration: z.string(),
  teamSize: z.number().optional().default(1),
  role: z.string(),
  client: z.string(),
  problem: z.string(),
  businessContext: z.string(),
  users: z.array(z.string()).optional().default([]),
  research: z.array(z.string()).optional().default([]),
  painPoints: z.array(z.string()).optional().default([]),
  requirements: z.array(z.string()).optional().default([]),
  userStories: z.array(z.string()).optional().default([]),
  prioritization: z.string().optional().default(""),
  roadmap: z
    .array(
      z.object({
        phase: z.string(),
        deliverables: z.array(z.string()),
      }),
    )
    .optional()
    .default([]),
  solution: z.string(),
  implementation: z.string().optional().default(""),
  challenges: z.array(z.string()).optional().default([]),
  decisions: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        tradeoff: z.string(),
      }),
    )
    .optional()
    .default([]),
  tradeoffs: z.string().optional().default(""),
  businessImpact: z.string().optional().default(""),
  metrics: z.array(z.string()).optional().default([]),
  kpis: z.array(z.string()).optional().default([]),
  timeline: z.array(z.string()).optional().default([]),
  screenshots: z.array(z.string()).optional().default([]),
  techStack: z.array(z.string()).optional().default([]),
  tools: z.array(z.string()).optional().default([]),
  stakeholders: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
      }),
    )
    .optional()
    .default([]),
  lessonsLearned: z.array(z.string()).optional().default([]),
  futureImprovements: z.array(z.string()).optional().default([]),
});

export const ProjectsSchema = z.array(ProjectItemSchema);
