import { CertificationsSchema } from "./schema";
import { Certifications } from "./types";

export function validateCertifications(data: unknown): Certifications {
  return CertificationsSchema.parse(data);
}

export function safeValidateCertifications(data: unknown) {
  return CertificationsSchema.safeParse(data);
}
