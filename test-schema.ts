
import { RepoSchema } from "./lib/schemas";
import overrides from "./content/apps-overrides.json";

async function test() {
    console.log("Testing overrides schema validation...");
    for (const override of overrides) {
        try {
            const fallback = {
                slug: override.slug,
                title: override.title || override.slug,
                oneLiner: override.oneLiner || "No description available",
                url: override.demoUrl || (override as any).url || "https://anchormarianas.com",
                stars: (override as any).stars || 0,
                lastPush: (override as any).lastPush || new Date().toISOString(),
                topics: (override as any).topics || [],
                demoUrl: override.demoUrl,
                pricingUrl: (override as any).pricingUrl,
                heroImage: override.heroImage,
                status: override.status,
                featuredStats: override.featuredStats
            };
            RepoSchema.parse(fallback);
            console.log(`✅ ${override.slug} passed`);
        } catch (error) {
            console.error(`❌ ${override.slug} failed:`, error);
        }
    }
}

test();
