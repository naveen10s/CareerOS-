import { BusinessAnalysisSchema } from "./schema";
import { BusinessAnalysis } from "./types";

export function validateBusinessAnalysis(data: unknown): BusinessAnalysis {
  return BusinessAnalysisSchema.parse(data);
}

export function safeValidateBusinessAnalysis(data: unknown) {
  return BusinessAnalysisSchema.safeParse(data);
}
