import { z } from "zod";

// GitHub repo schema
export const RepoSchema = z.object({
  slug: z.string(),
  title: z.string(),
  oneLiner: z.string(),
  url: z.string().url(),
  stars: z.number(),
  lastPush: z.string(),
  topics: z.array(z.string()),
  demoUrl: z.string().url().optional(),
  pricingUrl: z.string().url().optional(),
  heroImage: z.string().optional(),
  featuredStats: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional()
});

export type Repo = z.infer<typeof RepoSchema>;

// Quote form schema
export const QuoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  site: z.string().url().optional().or(z.literal("")),
  goal: z.string().min(10, "Please describe your goal in more detail").max(500, "Goal description too long"),
  timeline: z.enum(["1-2w", "2-4w", "flexible"]),
  budget: z.enum(["1k-3k", "3k-10k", "10k-25k", "25k+"]),
  package: z.enum(["starter", "growth", "studio", "custom"]),
  link: z.string().url().optional().or(z.literal(""))
});

export type QuotePayload = z.infer<typeof QuoteSchema>;

// Service schema
export const ServiceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  for: z.string(),
  deliverables: z.array(z.string()),
  timeline: z.string(),
  fromPrice: z.string(),
  stripePriceId: z.string().optional(),
  quoteOnly: z.boolean().optional(),
  exclusions: z.array(z.string())
});

export type Service = z.infer<typeof ServiceSchema>;

// Site config schema
export const SiteConfigSchema = z.object({
  studioName: z.string(),
  tagline: z.string(),
  email: z.string().email(),
  personalSite: z.string().url(),
  socials: z.object({
    x: z.string().url(),
    github: z.string().url()
  }),
  trustLogos: z.array(z.string())
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;