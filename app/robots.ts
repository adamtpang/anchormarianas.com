import type { MetadataRoute } from "next";

const SITE_URL = "https://anchormarianas.com";

const privateDesk = ["/buy", "/buy-gate"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privateDesk },
      { userAgent: "GPTBot", allow: "/", disallow: privateDesk },
      { userAgent: "ClaudeBot", allow: "/", disallow: privateDesk },
      { userAgent: "anthropic-ai", allow: "/", disallow: privateDesk },
      { userAgent: "PerplexityBot", allow: "/", disallow: privateDesk },
      { userAgent: "Google-Extended", allow: "/", disallow: privateDesk },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
