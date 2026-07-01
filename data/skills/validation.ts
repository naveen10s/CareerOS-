import { SkillsSchema } from "./schema";
import { Skills } from "./types";

export function validateSkills(data: unknown): Skills {
  return SkillsSchema.parse(data);
}

export function safeValidateSkills(data: unknown) {
  return SkillsSchema.safeParse(data);
}
