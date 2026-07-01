import { CoursesSchema } from "./schema";
import { Courses } from "./types";

export function validateCourses(data: unknown): Courses {
  return CoursesSchema.parse(data);
}

export function safeValidateCourses(data: unknown) {
  return CoursesSchema.safeParse(data);
}
