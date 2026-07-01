import analyticsData from "./analytics.json";

export interface AnalyticsKPIs {
  projectsCompleted: number;
  yearsExperience: number;
  technologiesUsed: number;
  domainsWorked: number;
  learningHours: number;
  stakeholdersSupported: number;
  processImprovements: number;
  productDeliveries: number;
}

export interface AnalyticsGrowth {
  year: string;
  role: string;
  level: number;
  milestone: string;
}

export interface AnalyticsLearning {
  month: string;
  hours: number;
}

export interface TechnologyUsageItem {
  name: string;
  projects: number;
  category: string;
}

export interface SkillRadarItem {
  category: string;
  level: number;
}

export interface DomainDistributionItem {
  domain: string;
  count: number;
  color: string;
}

export interface ImpactMetricItem {
  id: string;
  label: string;
  value: string;
  direction: string;
  description: string;
  category: string;
}

export interface AchievementItem {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface LearningProgressItem {
  name: string;
  type: string;
  progress: number;
  status: string;
}

export interface ActivityFeedItem {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
}

export interface AnalyticsData {
  kpis: AnalyticsKPIs;
  careerGrowth: AnalyticsGrowth[];
  monthlyLearning: AnalyticsLearning[];
  technologyUsage: TechnologyUsageItem[];
  skillRadar: SkillRadarItem[];
  domainDistribution: DomainDistributionItem[];
  impactMetrics: ImpactMetricItem[];
  achievements: AchievementItem[];
  learningProgress: LearningProgressItem[];
  activityFeed: ActivityFeedItem[];
}

export const analytics: AnalyticsData = analyticsData as any;
export default analytics;
