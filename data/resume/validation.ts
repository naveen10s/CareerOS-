import { ResumeSchema } from "./schema";
import { Resume } from "./types";

export function validateResume(data: unknown): Resume {
  return ResumeSchema.parse(data);
}

export function safeValidateResume(data: unknown) {
  return ResumeSchema.safeParse(data);
}
