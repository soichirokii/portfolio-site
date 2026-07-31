import type { MetadataRoute } from "next";
import { fetchAllWorks } from "@/lib/notion";

const BASE_URL = "https://soichirokii.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 固定ページ
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, priority: 1 },
    { url: `${BASE_URL}/works`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, priority: 0.5 },
  ];

  // 作品詳細ページ（/works/[slug]）を Notion のデータから動的に生成
  const works = await fetchAllWorks();
  const workRoutes: MetadataRoute.Sitemap = works
    .filter((w) => w.slug)
    .map((w) => ({
      url: `${BASE_URL}/works/${w.slug}`,
      lastModified: now,
      priority: 0.8,
    }));

  return [...staticRoutes, ...workRoutes];
}
