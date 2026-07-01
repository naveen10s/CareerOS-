import { WebsiteSchema } from "./schema";
import { Website } from "./types";

export function validateWebsite(data: unknown): Website {
  return WebsiteSchema.parse(data);
}

export function safeValidateWebsite(data: unknown) {
  return WebsiteSchema.safeParse(data);
}
