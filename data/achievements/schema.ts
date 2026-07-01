import { z } from "zod";

export const AchievementItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  metricImpact: z.string(),
  category: z.string(),
});

export const AchievementsSchema = z.array(AchievementItemSchema);
export default AchievementsSchema;
