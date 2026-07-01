export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  journey: "/journey",
  experience: "/experience",
  projects: "/projects",
  productLab: "/product-lab",
  analytics: "/analytics",
  learning: "/learning",
  resume: "/resume",
  contact: "/contact",
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = (typeof ROUTES)[RouteKeys];
export default ROUTES;
