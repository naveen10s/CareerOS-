import { z } from "zod";
import { AiWorkspaceSchema } from "./schema";

export type AiWorkspace = z.infer<typeof AiWorkspaceSchema>;
export type AiTool = z.infer<typeof import("./schema").AiToolSchema>;
export type AiPrompt = z.infer<typeof import("./schema").AiPromptSchema>;
export type AiWorkflow = z.infer<typeof import("./schema").AiWorkflowSchema>;
export type AiAutomation = z.infer<typeof import("./schema").AiAutomationSchema>;
export type AiLearningItem = z.infer<typeof import("./schema").AiLearningItemSchema>;
