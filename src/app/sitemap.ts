import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");

  const routes = [
    "/",
    "/aimto/learnathon",
    "/welcome",
    "/countdown",
    "/leaderboard",
  ] as const;

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/welcome" ? "weekly" : "weekly",
    priority: path === "/" || path === "/aimto/learnathon" ? 1 : 0.8,
  }));
}
