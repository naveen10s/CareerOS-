import skillsData from "./skills.json";

export interface PMSkill {
  name: string;
  level: number;
  transferableFromBA: boolean;
  description: string;
}

export interface BASkill {
  name: string;
  level: number;
  description: string;
}

export interface TechSkill {
  name: string;
  level: number;
}

export interface SkillsData {
  productManagement: PMSkill[];
  businessAnalysis: BASkill[];
  technical: TechSkill[];
}

export const skills: SkillsData = skillsData.example as SkillsData;
export default skills;
