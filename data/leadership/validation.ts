import { LeadershipSchema } from "./schema";
import { Leadership } from "./types";

export function validateLeadership(data: unknown): Leadership {
  return LeadershipSchema.parse(data);
}

export function safeValidateLeadership(data: unknown) {
  return LeadershipSchema.safeParse(data);
}
