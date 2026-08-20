import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const SITE_URL = "https://anchormarianas.com";

function readSlugs(): string[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), "content", "reads"))
      .filter((f) => f.endsWith(".json"))
      .map((f) => `/scan/${f.replace(/\.json$/, "")}`);
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/guam",
    "/scan",
    "/audit",
    "/build",
    "/pricing",
    "/work",
    "/about",
    "/careers",
    "/privacy",
    "/terms",
    ...readSlugs(),
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/guam" ? 0.9 : 0.7,
  }));
}
