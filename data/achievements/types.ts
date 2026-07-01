import { z } from "zod";
import { AchievementsSchema, AchievementItemSchema } from "./schema";

export type Achievements = z.infer<typeof AchievementsSchema>;
export type AchievementItem = z.infer<typeof AchievementItemSchema>;
