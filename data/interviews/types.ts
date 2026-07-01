import { z } from "zod";
import { InterviewsSchema } from "./schema";

export type Interviews = z.infer<typeof InterviewsSchema>;
