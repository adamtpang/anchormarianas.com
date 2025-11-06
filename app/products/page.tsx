import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getStudioApps } from "@/lib/github"
import { AppCard } from "@/components/app-card"

export const revalidate = 21600 // 6 hours

export const metadata = {
  title: "Products | AnchorMarianas",
  description: "Apps and digital products we've built and shipped.",
}

async function getAllApps() {
  try {
    const apps = await getStudioApps()
    return apps
  } catch (error) {
    console.error("Failed to fetch apps:", error)
    return []
  }
}

export default async function ProductsPage() {
  const apps = await getAllApps()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-12 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Products</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Apps and digital products we've built and shipped. All live. All working.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>

          {apps.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No products to show yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Want us to build something for you?</h2>
          <p className="text-lg text-muted-foreground">
            We ship products fast. Get a custom quote for your project.
          </p>
          <Button size="lg" asChild>
            <Link href="/services">
              See Our Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
