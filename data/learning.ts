import learningData from "./learning.json";

export interface LearningItem {
  id: string;
  topic: string;
  platform: string;
  category: string;
  progress: number;
  status: string;
  targetDate: string;
  completedDate: string;
  relevance: string;
  certificate: boolean;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  status: string;
  category: string;
  relevance: string;
}

export interface RoadmapQuarterItem {
  id: string;
  title: string;
  quarter: string;
  skills: string[];
  status: string;
}

export interface LearningData {
  example: LearningItem[];
  books: BookItem[];
  roadmap: RoadmapQuarterItem[];
}

export const learning: LearningData = learningData as any;
export default learning;
