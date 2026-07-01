import { z } from "zod";

export const LeadershipItemSchema = z.object({
  id: z.string(),
  situation: z.string(),
  action: z.string(),
  outcome: z.string(),
  evidence: z.array(z.string()),
});

export const LeadershipSchema = z.array(LeadershipItemSchema);
