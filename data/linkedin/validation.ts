import { LinkedinSchema } from "./schema";
import { Linkedin } from "./types";

export function validateLinkedin(data: unknown): Linkedin {
  return LinkedinSchema.parse(data);
}

export function safeValidateLinkedin(data: unknown) {
  return LinkedinSchema.safeParse(data);
}
