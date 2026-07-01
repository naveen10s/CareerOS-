import { z } from "zod";
import { SkillsSchema } from "./schema";

export type Skill = z.infer<typeof SkillsSchema>[number];
export type Skills = z.infer<typeof SkillsSchema>;
