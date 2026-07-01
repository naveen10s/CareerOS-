// src/lib/validation.ts
import { ZodSchema, z } from "zod";

/**
 * Helper to create a typed resolver for React Hook Form.
 * It extracts the inferred TypeScript type from a Zod schema.
 */
export function zodResolver<T extends ZodSchema<any>>(schema: T) {
  return async (values: unknown) => {
    try {
      const data = await schema.parseAsync(values);
      return { values: data, errors: {} };
    } catch (e) {
      const errors = (e as any).format();
      return { values: {}, errors };
    }
  };
}

/** Example schemas for reuse */
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters").max(1000),
  intent: z.enum(["role", "collaboration", "project", "general"]),
});
