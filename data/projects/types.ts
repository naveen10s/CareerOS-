import { z } from "zod";
import { ProjectsSchema } from "./schema";

export type Projects = z.infer<typeof ProjectsSchema>;
