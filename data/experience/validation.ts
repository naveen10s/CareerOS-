import { ExperienceSchema } from "./schema";
import { Experience } from "./types";

export function validateExperience(data: unknown): Experience {
  return ExperienceSchema.parse(data);
}

export function safeValidateExperience(data: unknown) {
  return ExperienceSchema.safeParse(data);
}
