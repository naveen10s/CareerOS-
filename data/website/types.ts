import { z } from "zod";
import { WebsiteSchema } from "./schema";

export type Website = z.infer<typeof WebsiteSchema>;
