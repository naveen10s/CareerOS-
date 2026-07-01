import { MetadataRoute } from "next";
import { siteConfig } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/dashboard",
    "/journey",
    "/experience",
    "/projects",
    "/product-lab",
    "/analytics",
    "/skills",
    "/learning",
    "/resume",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
