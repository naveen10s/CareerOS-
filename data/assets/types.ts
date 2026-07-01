import { z } from "zod";
import { AssetsSchema } from "./schema";

export type Assets = z.infer<typeof AssetsSchema>;
