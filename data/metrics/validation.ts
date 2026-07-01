import { MetricsSchema } from "./schema";
import { Metrics } from "./types";

export function validateMetrics(data: unknown): Metrics {
  return MetricsSchema.parse(data);
}

export function safeValidateMetrics(data: unknown) {
  return MetricsSchema.safeParse(data);
}
