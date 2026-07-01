import achievementsData from "./achievements.json";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metricImpact: string;
  category: string;
}

export const achievements: Achievement[] = achievementsData.example as Achievement[];
export default achievements;
