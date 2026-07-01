import certificationsData from "./certifications.json";

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
}

export const certifications: Certification[] = certificationsData.example as Certification[];
export default certifications;
