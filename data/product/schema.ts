import { z } from "zod";

export const ProductSchema = z.object({
  wireframing: z.array(z.string()),
  userDiscovery: z.array(z.string()),
  roadmapping: z.array(z.string()),
  backlogGrooming: z.array(z.string()),
});
