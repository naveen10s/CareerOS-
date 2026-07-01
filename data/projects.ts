import projectsData from "./projects.json";

export interface ProjectDecision {
  title: string;
  description: string;
  tradeoff: string;
}

export interface ProjectRoadmap {
  phase: string;
  deliverables: string[];
}

export interface ProjectStakeholder {
  name: string;
  role: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  duration: string;
  teamSize: number;
  role: string;
  client: string;
  problem: string;
  businessContext: string;
  users: string[];
  research: string[];
  painPoints: string[];
  requirements: string[];
  userStories: string[];
  prioritization: string;
  roadmap: ProjectRoadmap[];
  solution: string;
  implementation: string;
  challenges: string[];
  decisions: ProjectDecision[];
  tradeoffs: string;
  businessImpact: string;
  metrics: string[];
  kpis: string[];
  timeline: string[];
  screenshots: string[];
  techStack: string[];
  tools: string[];
  stakeholders: ProjectStakeholder[];
  lessonsLearned: string[];
  futureImprovements: string[];
}

export const projects: ProjectItem[] = projectsData.example as any[];
export default projects;
