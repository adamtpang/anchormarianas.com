import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Calendar } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">Adam Pang</h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Building code, music & philosophy at Network School.
        </p>

        <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
          <Link href="/start-here" className="flex items-center gap-2">
            Start Here
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </section>

      {/* Featured Content Cards */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Latest Essay</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                Dec 15
              </div>
            </div>
            <CardTitle className="group-hover:text-accent transition-colors">The Philosophy of Code</CardTitle>
            <CardDescription>
              Exploring the intersection of programming and philosophical thinking in modern software development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />8 min read
              </div>
              <Link href="/essays/philosophy-of-code" className="text-accent hover:underline text-sm font-medium">
                Read more
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Latest Project</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                Dec 12
              </div>
            </div>
            <CardTitle className="group-hover:text-accent transition-colors">Harmony Engine</CardTitle>
            <CardDescription>
              An AI-powered music composition tool that helps musicians explore new harmonic possibilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="outline">React</Badge>
              <Link href="/projects/harmony-engine" className="text-accent hover:underline text-sm font-medium">
                View project
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Latest Micro-post</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                Dec 18
              </div>
            </div>
            <CardTitle className="group-hover:text-accent transition-colors">On Digital Minimalism</CardTitle>
            <CardDescription>
              {"The best interfaces are invisible. They get out of the way and let you focus on what matters."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="outline">Note</Badge>
              <Link href="/stream#digital-minimalism" className="text-accent hover:underline text-sm font-medium">
                View post
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Navigation */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Explore More</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/essays">Essays</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">Projects</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/stream">Stream</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/work-with-me">Work With Me</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/now">Now</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/support">Support</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}