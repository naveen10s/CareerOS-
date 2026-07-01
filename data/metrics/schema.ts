import { z } from "zod";

export const MetricItemSchema = z.object({
  id: z.string(),
  metric: z.string(),
  value: z.string(),
  improvement: z.string(),
  context: z.string(),
});

export const MetricsSchema = z.array(MetricItemSchema);
