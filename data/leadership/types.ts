import { z } from "zod";
import { LeadershipSchema } from "./schema";

export type Leadership = z.infer<typeof LeadershipSchema>;
