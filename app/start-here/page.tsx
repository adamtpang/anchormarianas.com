import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Twitter, Rss } from "lucide-react"

export default function StartHerePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Start Here</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Welcome to my corner of the internet. This is your table of contents to everything I create and think about.
        </p>
      </section>

      {/* Now Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Now</h2>
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg leading-relaxed text-foreground mb-4">
                  Currently building the future of education at Network School, exploring the intersection of technology
                  and human potential. Based in San Francisco, spending my time between code, music composition, and
                  philosophical inquiry.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/now" className="flex items-center gap-2">
                    Read more about what I'm up to
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* What I Do */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">What I Do</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Apps
              </CardTitle>
              <CardDescription>
                Building tools and experiences that help people learn, create, and connect more effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="p-0 h-auto">
                <Link href="/projects" className="text-accent hover:underline">
                  View projects →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">✍️</span>
                Essays
              </CardTitle>
              <CardDescription>
                Long-form thoughts on technology, philosophy, creativity, and the future of human potential.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="p-0 h-auto">
                <Link href="/essays" className="text-accent hover:underline">
                  Read essays →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎵</span>
                Music
              </CardTitle>
              <CardDescription>
                Composing ambient and electronic music that explores the relationship between technology and emotion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="p-0 h-auto">
                <Link href="/music" className="text-accent hover:underline">
                  Listen to music →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤔</span>
                Philosophy
              </CardTitle>
              <CardDescription>
                Exploring questions about consciousness, meaning, and how we can build a more thoughtful world.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="p-0 h-auto">
                <Link href="/philosophy" className="text-accent hover:underline">
                  Explore ideas →
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Of */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Best Of</h2>
        <div className="space-y-4">
          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">The Art of Digital Minimalism</h3>
                  <p className="text-muted-foreground mb-3">
                    How reducing digital noise can lead to more meaningful creative work and deeper thinking.
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Essay</Badge>
                    <span className="text-sm text-muted-foreground">12 min read</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/essays/digital-minimalism">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Harmony Engine</h3>
                  <p className="text-muted-foreground mb-3">
                    An AI-powered music composition tool that helps musicians explore new harmonic possibilities.
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Project</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">AI</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/projects/harmony-engine">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Building Thoughtful Software</h3>
                  <p className="text-muted-foreground mb-3">
                    Why the future of technology depends on creating tools that enhance rather than diminish human
                    agency.
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Essay</Badge>
                    <span className="text-sm text-muted-foreground">15 min read</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/essays/thoughtful-software">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Go Deeper */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Go Deeper</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Bookshelf</CardTitle>
              <CardDescription>Books that have shaped my thinking and continue to influence my work.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/bookshelf">Explore books</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Work With Me</CardTitle>
              <CardDescription>Interested in collaborating? Learn about my services and approach.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/work-with-me">Get in touch</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Support</CardTitle>
              <CardDescription>Help support my work and keep these resources freely available.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/support">Support my work</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Stay Connected</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get updates on new essays, projects, and ideas. I send thoughtful updates, never spam.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link href="/newsletter" className="flex items-center gap-2">
              <Rss className="h-4 w-4" />
              Subscribe to newsletter
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href="https://twitter.com/adampang"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
              Follow on Twitter
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://warpcast.com/adampang" target="_blank" rel="noopener noreferrer">
              Follow on Farcaster
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}