import { BlogSchema } from "./schema";
import { Blog } from "./types";

export function validateBlog(data: unknown): Blog {
  return BlogSchema.parse(data);
}

export function safeValidateBlog(data: unknown) {
  return BlogSchema.safeParse(data);
}
