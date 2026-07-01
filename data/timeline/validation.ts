import { TimelineSchema } from "./schema";
import { Timeline } from "./types";

export function validateTimeline(data: unknown): Timeline {
  return TimelineSchema.parse(data);
}

export function safeValidateTimeline(data: unknown) {
  return TimelineSchema.safeParse(data);
}
