import { z } from "zod";

export const BusinessAnalysisSchema = z.object({
  dataMapping: z.array(z.string()),
  processModeling: z.array(z.string()),
  requirementsElicitation: z.array(z.string()),
  gapAnalysis: z.array(z.string()),
});
