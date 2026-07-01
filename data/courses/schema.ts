import { z } from "zod";

export const CourseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  platform: z.string(),
  date: z.string(),
  syllabus: z.array(z.string()),
});

export const CoursesSchema = z.array(CourseItemSchema);
