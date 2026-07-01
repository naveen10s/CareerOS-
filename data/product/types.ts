import { z } from "zod";
import { ProductSchema } from "./schema";

export type Product = z.infer<typeof ProductSchema>;
