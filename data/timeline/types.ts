import { z } from "zod";
import { TimelineSchema } from "./schema";

export type Timeline = z.infer<typeof TimelineSchema>;
