import { z } from "zod";

export const WebsiteSchema = z.object({
  hero: z.object({
    title: z.string(),
    sub: z.string(),
  }),
  journey: z.object({
    timelineIds: z.array(z.string()),
  }),
  projects: z.object({
    displayIds: z.array(z.string()),
  }),
  dashboard: z.object({
    chartType: z.string(),
    showMetricIds: z.array(z.string()),
  }),
  analytics: z.object({
    funnelId: z.string(),
  }),
  learning: z.object({
    currentTopic: z.string(),
  }),
});
