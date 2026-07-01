import { z } from "zod";
import { CertificationsSchema } from "./schema";

export type Certifications = z.infer<typeof CertificationsSchema>;
