import { z } from "zod";

export const ResumeSchema = z.object({
  professionalSummary: z.string(),
  experienceIds: z.array(z.string()),
  projectIds: z.array(z.string()),
  skillIds: z.array(z.string()),
});
