import { z } from "zod";
import { BusinessAnalysisSchema } from "./schema";

export type BusinessAnalysis = z.infer<typeof BusinessAnalysisSchema>;
