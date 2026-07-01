import { z } from "zod";
import { CoursesSchema } from "./schema";

export type Courses = z.infer<typeof CoursesSchema>;
