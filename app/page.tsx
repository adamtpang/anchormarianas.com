import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Star, Quote, CheckCircle } from "lucide-react"
import Link from "next/link"
import { getStudioApps } from "@/lib/github"
import siteConfig from "@/content/site.json"

export const revalidate = 21600 // 6 hours

async function getAppsPreview() {
  try {
    const apps = await getStudioApps()
    return apps.slice(0, 6) // Show first 6 apps
  } catch (error) {
    console.error("Failed to fetch apps preview:", error)
    return []
  }
}

export default async function HomePage() {
  const apps = await getAppsPreview()
  const totalApps = 100 // The "100 apps" concept
  const shippedApps = apps.length

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  {siteConfig.tagline}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                  Building the future, <span className="text-accent">one app at a time</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Speed to market. Performance obsessed. Conversion focused.
                  We ship minimum-effective solutions that actually work.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/quote">
                    Get Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/work">
                    View Work
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-8 pt-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">≥95 Lighthouse</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Performance</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">2-4 week</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 100 Apps Visualization */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-accent">{totalApps}</div>
                  <div className="text-muted-foreground">Apps Concept</div>
                  <div className="grid grid-cols-10 gap-1 max-w-xs mx-auto">
                    {Array.from({ length: totalApps }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${
                          i < shippedApps ? "bg-accent" : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {shippedApps} shipped, {totalApps - shippedApps} more coming
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Selected Work</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Real apps autopulled from GitHub. Each one ships fast, performs well, converts users.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app) => (
              <div key={app.slug} className="group cursor-pointer">
                <div className="bg-background rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{app.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {app.stars}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm text-pretty mb-4">{app.oneLiner}</p>
                    <div className="flex flex-wrap gap-1">
                      {app.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/work">
                View All Work
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border relative">
            <Quote className="w-12 h-12 text-accent/20 absolute top-6 left-6" />

            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-center text-pretty leading-relaxed mb-8">
                "Fast, clean, converts. AnchorMarianas delivered exactly what we needed without the bloat.
                Our conversion rate doubled in the first month."
              </blockquote>

              <div className="text-center">
                <div className="font-semibold text-lg">Sarah Chen</div>
                <div className="text-muted-foreground">Founder, TechFlow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Ship?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              From MVP to full product. Fixed packages or custom quotes.
              Partnership equity deals for the right projects.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 md:p-12 space-y-8 border border-border">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Speed to Market</h3>
                <p className="text-muted-foreground text-sm">
                  Ship fast, iterate faster. Every day without users is a day without learning.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Performance Obsessed</h3>
                <p className="text-muted-foreground text-sm">
                  ≥95 Lighthouse scores aren't optional. Speed is a feature, not a nice-to-have.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Conversion Focused</h3>
                <p className="text-muted-foreground text-sm">
                  Beautiful design that doesn't convert is just art. We optimize for business outcomes.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/quote">
                    Get Custom Quote
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services">
                    View Packages
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Partnership opportunities available for the right projects
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}