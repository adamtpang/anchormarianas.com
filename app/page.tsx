import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getStudioApps } from "@/lib/github"
import { AppCard } from "@/components/app-card"

export const revalidate = 21600 // 6 hours

async function getAllApps() {
  try {
    const apps = await getStudioApps()
    return apps
  } catch (error) {
    console.error("Failed to fetch apps:", error)
    return []
  }
}

export default async function HomePage() {
  const apps = await getAllApps()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="AnchorMarianas Logo"
              width={200}
              height={200}
              priority
              className="w-32 h-32 md:w-48 md:h-48"
            />
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              AnchorMarianas
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-2xl mx-auto">
              We build internet products.
              <br />
              We deliver for clients.
            </p>
          </div>

          {/* Trusted by */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Trusted by</p>
            <p className="text-lg font-medium">
              Prospera · Hilton · Network School · IDI
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-6 scroll-mt-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Apps and digital products we've built and shipped. All live. All working.
            </p>
          </div>

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

      {/* Services */}
      <section id="services" className="py-20 px-6 scroll-mt-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Services</h2>
            <p className="text-xl text-muted-foreground">
              We ship products for clients. Fast. Clean. Profitable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-2xl p-8 border border-border space-y-4">
              <h3 className="text-2xl font-bold">Build</h3>
              <p className="text-muted-foreground">
                MVP to full product in 2-4 weeks. Modern stack. Performance-first. Conversion-optimized.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Web apps</li>
                <li>• Mobile apps</li>
                <li>• Landing pages</li>
                <li>• Product redesigns</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border space-y-4">
              <h3 className="text-2xl font-bold">Partner</h3>
              <p className="text-muted-foreground">
                Technical co-founder for equity. We build, you scale. Long-term aligned incentives.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Equity partnerships</li>
                <li>• Revenue share deals</li>
                <li>• Technical advisory</li>
                <li>• Product strategy</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/quote">
                Get a Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 scroll-mt-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Team</h2>
            <p className="text-xl text-muted-foreground">
              Building products. Delivering for clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                <Image
                  src="/adam.jpg"
                  alt="Adam Pangelinan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Adam Pangelinan</h3>
                <p className="text-xl text-muted-foreground">Founder</p>
              </div>

              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I build internet products—for myself and for clients. Fast, clean, focused on outcomes.
                </p>

                <p>
                  I've worked with organizations like <strong className="text-foreground">Prospera</strong>, <strong className="text-foreground">Hilton</strong>, <strong className="text-foreground">Network School</strong>, and others,
                  shipping products that solve real problems.
                </p>

                <p>
                  My approach: Ship fast. No bloat. Focus on what converts.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://adamtomas.fun" target="_blank" rel="noopener noreferrer">
                    Personal Site
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://linkedin.com/in/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://x.com/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 pt-16 border-t">
            <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Vercel"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center space-y-6">
            <h3 className="text-3xl font-bold">Let's work together</h3>
            <p className="text-lg text-muted-foreground">
              Have a project? Let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/quote">
                  Get a Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:adam@anchormarianas.com">
                  Email Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
