import { z } from "zod";
import { ResumeSchema } from "./schema";

export type Resume = z.infer<typeof ResumeSchema>;
