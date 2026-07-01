import { AssetsSchema } from "./schema";
import { Assets } from "./types";

export function validateAssets(data: unknown): Assets {
  return AssetsSchema.parse(data);
}

export function safeValidateAssets(data: unknown) {
  return AssetsSchema.safeParse(data);
}
