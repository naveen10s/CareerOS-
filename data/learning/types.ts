import { z } from "zod";
import { LearningSchema } from "./schema";

export type Learning = z.infer<typeof LearningSchema>;
