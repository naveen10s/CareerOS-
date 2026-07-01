import { z } from "zod";
import { MetricsSchema } from "./schema";

export type Metrics = z.infer<typeof MetricsSchema>;
