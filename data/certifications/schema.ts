import { z } from "zod";

export const CertificationItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional(),
});

export const CertificationsSchema = z.array(CertificationItemSchema);
