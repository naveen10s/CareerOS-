import resumeData from "./resume/example.json";

export interface ResumeData {
  professionalSummary: string;
  experienceIds: string[];
  projectIds: string[];
  skillIds: string[];
}

export const resume: ResumeData = resumeData as ResumeData;
export default resume;
