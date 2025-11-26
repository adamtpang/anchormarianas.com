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
  // Create a map of repos by slug for easy lookup
  const repoMap = new Map(normalized.map(repo => [repo.slug, repo]));

  // Process overrides: merge with existing repo or create new entry
  const allApps = overrides.reduce<Repo[]>((acc, override: any) => {
    try {
      const existingRepo = repoMap.get(override.slug);

      const merged = {
        ...(existingRepo || {}),
        ...override,
        // Ensure required fields are present if it's a standalone override
        title: override.title || existingRepo?.title || override.slug,
        oneLiner: override.oneLiner || existingRepo?.oneLiner || "No description available",
        url: override.demoUrl || override.url || existingRepo?.url || "https://anchormarianas.com",
        stars: override.stars || existingRepo?.stars || 0,
        lastPush: override.lastPush || existingRepo?.lastPush || new Date().toISOString(),
        topics: override.topics || existingRepo?.topics || [],
      };

      const parsed = RepoSchema.parse(merged);
      acc.push(parsed);

      // Remove from map so we know it's handled
      if (existingRepo) {
        repoMap.delete(override.slug);
      }
    } catch (err) {
      console.error(`Failed to parse app for ${override.slug}:`, err);
    }
    return acc;
  }, []);

  // Add remaining repos that didn't have overrides
  repoMap.forEach(repo => {
    allApps.push(repo);
  });

  return allApps.sort((a, b) => {
    // Sort by recency (lastPush) first
    return new Date(b.lastPush).getTime() - new Date(a.lastPush).getTime();
  });
}

export async function revalidateRepos() {
  // This will be called by the revalidate API endpoint
  const { revalidateTag } = await import("next/cache");
  revalidateTag("studio-apps");
}