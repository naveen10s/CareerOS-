import { ProfileSchema } from "./schema";
import { Profile } from "./types";

export function validateProfile(data: unknown): Profile {
  return ProfileSchema.parse(data);
}

export function safeValidateProfile(data: unknown) {
  return ProfileSchema.safeParse(data);
}
