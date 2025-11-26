import { Octokit } from "@octokit/rest";
import { Repo, RepoSchema } from "./schemas";
import allowlist from "@/content/github-allowlist.json";
import overrides from "@/content/apps-overrides.json";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const owner = process.env.GITHUB_OWNER || "adamtpang";

export async function fetchRepos(): Promise<any[]> {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: owner,
      type: "owner",
      per_page: 100,
      sort: "updated"
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    return [];
  }
}

export function filterRepos(repos: any[]): any[] {
  if (allowlist.length > 0) {
    return repos.filter(repo => allowlist.includes(repo.name));
  }

  // Fallback: repos with "anchormarianas" topic or homepage set
  return repos.filter(repo =>
    repo.topics?.includes("anchormarianas") ||
    repo.homepage
  );
}

export function normalizeRepo(repo: any): Repo {
  const normalized = {
    slug: repo.name,
    title: repo.name.replace(/-/g, " ").toLowerCase(),
    oneLiner: repo.description || "No description available",
    url: repo.homepage || repo.html_url,
    stars: repo.stargazers_count,
    lastPush: repo.pushed_at,
    topics: repo.topics || []
  };

  return RepoSchema.parse(normalized);
}

export function mergeOverrides(repos: Repo[]): Repo[] {
  return repos.map(repo => {
    const override = overrides.find((o: any) => o.slug === repo.slug);
    if (!override) return repo;

    // Merge and validate the result
    const merged = { ...repo, ...override };
    return RepoSchema.parse(merged);
  });
}

export async function getStudioApps(): Promise<Repo[]> {
  const repos = await fetchRepos();
  const filtered = filterRepos(repos);
  const normalized = filtered.map(normalizeRepo);
  const merged = mergeOverrides(normalized);

  // If no repos found, return overrides as standalone apps
  if (merged.length === 0 && overrides.length > 0) {
    return overrides.map((override: any) => {
      const fallback = {
        slug: override.slug,
        title: override.title || override.slug,
        oneLiner: override.oneLiner || "No description available",
        url: override.demoUrl || override.url || "https://anchormarianas.com",
        stars: override.stars || 0,
        lastPush: override.lastPush || new Date().toISOString(),
        topics: override.topics || [],
        demoUrl: override.demoUrl,
        pricingUrl: override.pricingUrl,
        heroImage: override.heroImage,
        status: override.status,
        featuredStats: override.featuredStats
      };
      return RepoSchema.parse(fallback);
    });
  }

  return merged.sort((a, b) => {
    // Sort by featured stats first, then stars, then last push
    if (a.featuredStats && !b.featuredStats) return -1;
    if (!a.featuredStats && b.featuredStats) return 1;
    if (a.stars !== b.stars) return b.stars - a.stars;
    return new Date(b.lastPush).getTime() - new Date(a.lastPush).getTime();
  });
}

export async function revalidateRepos() {
  // This will be called by the revalidate API endpoint
  const { revalidateTag } = await import("next/cache");
  revalidateTag("studio-apps");
}