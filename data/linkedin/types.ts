import { z } from "zod";
import { LinkedinSchema } from "./schema";

export type Linkedin = z.infer<typeof LinkedinSchema>;
