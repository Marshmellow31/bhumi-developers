import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/hotels", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/gacl-colony", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/downloads", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: project.status === "Ongoing" ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
