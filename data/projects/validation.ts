import { ProjectsSchema } from "./schema";
import { Projects } from "./types";

export function validateProjects(data: unknown): Projects {
  return ProjectsSchema.parse(data);
}

export function safeValidateProjects(data: unknown) {
  return ProjectsSchema.safeParse(data);
}
