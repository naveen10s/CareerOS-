import { ProductSchema } from "./schema";
import { Product } from "./types";

export function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data);
}

export function safeValidateProduct(data: unknown) {
  return ProductSchema.safeParse(data);
}
