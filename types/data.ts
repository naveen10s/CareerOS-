export interface TransitionNarrative {
  whyProductManagement: string;
  transferableSkills: string[];
}

export interface Profile {
  name: string;
  headline: string;
  currentRole: string;
  targetRole: string;
  summary: string;
  avatar: string;
  email: string;
  location: string;
  strengths: string[];
  transitionNarrative: TransitionNarrative;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string[];
  pmKeywords: string[];
  baKeywords: string[];
  impactMetrics: string[];
}

export interface ProjectLinks {
  github?: string;
  live?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  role: string;
  technologies: string[];
  pmAspects: string[];
  baAspects: string[];
  metrics: string[];
  links?: ProjectLinks;
}

export interface SkillItem {
  name: string;
  level: number; // 1-5
  transferableFromBA?: boolean;
  description?: string;
}

export interface Skills {
  productManagement: SkillItem[];
  businessAnalysis: SkillItem[];
  technical: SkillItem[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Course {
  name: string;
  platform: string;
  completionDate: string;
  pmFocus: boolean;
  skillsCovered: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metricImpact?: string;
  category: string;
}

export interface LearningItem {
  id: string;
  topic: string;
  platform: string;
  progress: number; // 0-100
  targetDate: string;
  relevance: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  change: string;
  baValueExplanation: string;
  pmValueExplanation: string;
}

export type TimelineMilestone = "career" | "education" | "pm-transition" | "project-launch";

export interface TimelineItem {
  id: string;
  year: string;
  quarter?: string;
  event: string;
  details: string;
  milestoneType: TimelineMilestone;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon?: string;
}
