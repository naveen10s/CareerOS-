import timelineData from "./timeline.json";

export interface TimelineLink {
  label: string;
  url: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  description: string;
  achievements: string[];
  technologies: string[];
  skills: string[];
  milestone: boolean;
  links: TimelineLink[];
  status: string;
}

export const timeline: TimelineItem[] = timelineData.example as TimelineItem[];
export default timeline;
