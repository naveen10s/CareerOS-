import { z } from "zod";
import { BlogSchema } from "./schema";

export type Blog = z.infer<typeof BlogSchema>;
