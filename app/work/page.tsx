import { Metadata } from "next";
import { getStudioApps } from "@/lib/github";
import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Work | AnchorMarianas",
  description: "Apps and projects built by AnchorMarianas studio",
};

// Revalidate every 6 hours
export const revalidate = 21600;

export default async function WorkPage() {
  const apps = await getStudioApps();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Apps & Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Internet products built for speed, conversion, and delight. Each one designed to solve real problems.
          </p>
        </div>

        {/* Apps Grid */}
        {apps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No apps found. Check back soon!</p>
            <Button asChild variant="outline">
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app) => (
              <div
                key={app.slug}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                {/* Hero Image */}
                {app.heroImage && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <Image
                      src={app.heroImage}
                      alt={app.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-3 h-3" />
                      {app.stars}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">
                    {app.oneLiner}
                  </p>

                  {/* Stats */}
                  {app.featuredStats && app.featuredStats.length > 0 && (
                    <div className="flex gap-4 mb-4">
                      {app.featuredStats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-lg font-bold text-accent">
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Topics */}
                  {app.topics && app.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {app.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {app.topics.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{app.topics.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {app.demoUrl && (
                      <Button asChild size="sm" className="flex-1">
                        <Link href={app.demoUrl} target="_blank">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Demo
                        </Link>
                      </Button>
                    )}

                    <Button asChild variant="outline" size="sm">
                      <Link href={app.url} target="_blank">
                        <Github className="w-3 h-3 mr-2" />
                        Code
                      </Link>
                    </Button>

                    {app.pricingUrl && (
                      <Button asChild size="sm" variant="default">
                        <Link href={app.pricingUrl} target="_blank">
                          Buy
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-muted/50 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Need something custom?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            From landing pages to full MVPs, we build internet products that work.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}