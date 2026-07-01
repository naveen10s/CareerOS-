import { z } from "zod";

export const AiToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  efficiencyGain: z.string(),
});

export const AiPromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  template: z.string(),
  description: z.string(),
  favorite: z.boolean(),
  usageCount: z.number(),
});

export const AiWorkflowStepSchema = z.object({
  stepNumber: z.number(),
  name: z.string(),
  description: z.string(),
});

export const AiWorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  stepsCount: z.number(),
  trigger: z.string(),
  steps: z.array(AiWorkflowStepSchema),
});

export const AiAutomationSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  frequency: z.string(),
  nextRun: z.string(),
  lastSuccess: z.string(),
});

export const AiLearningItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  event: z.string(),
  category: z.string(),
  description: z.string(),
});

export const AiWorkspaceSchema = z.object({
  tools: z.array(AiToolSchema),
  prompts: z.array(AiPromptSchema),
  workflows: z.array(AiWorkflowSchema),
  automation: z.array(AiAutomationSchema),
  learningTimeline: z.array(AiLearningItemSchema),
});
