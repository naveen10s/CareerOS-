import experienceData from "./experience.json";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  summary: string;
  responsibilities: string[];
  pmKeywords: string[];
  baKeywords: string[];
  impactMetrics: string[];
  techStack: string[];
}

export const experience: ExperienceItem[] = experienceData.example as ExperienceItem[];
export default experience;
