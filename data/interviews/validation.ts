import { InterviewsSchema } from "./schema";
import { Interviews } from "./types";

export function validateInterviews(data: unknown): Interviews {
  return InterviewsSchema.parse(data);
}

export function safeValidateInterviews(data: unknown) {
  return InterviewsSchema.safeParse(data);
}
