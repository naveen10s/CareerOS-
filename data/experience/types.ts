import { z } from "zod";
import { ExperienceSchema } from "./schema";

export type Experience = z.infer<typeof ExperienceSchema>;
