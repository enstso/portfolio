import type { MetadataRoute } from "next";

import { getPublishedSitemapArticles } from "@/lib/articleService";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/project`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.8 },
  ];
  try {
    const articles = await getPublishedSitemapArticles();
    return [...staticRoutes, ...articles.map((article) => ({ url: `${siteConfig.url}/blog/${article.slug}`, lastModified: article.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 }))];
  } catch {
    return staticRoutes;
  }
}
