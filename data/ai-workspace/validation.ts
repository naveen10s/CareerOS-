import { AiWorkspaceSchema } from "./schema";
import { AiWorkspace } from "./types";

export function validateAiWorkspace(data: unknown): AiWorkspace {
  return AiWorkspaceSchema.parse(data);
}

export function safeValidateAiWorkspace(data: unknown) {
  return AiWorkspaceSchema.safeParse(data);
}
