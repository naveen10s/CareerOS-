import { LearningSchema } from "./schema";
import { Learning } from "./types";

export function validateLearning(data: unknown): Learning {
  return LearningSchema.parse(data);
}

export function safeValidateLearning(data: unknown) {
  return LearningSchema.safeParse(data);
}
