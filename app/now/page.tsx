import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Focus, BookOpen, Music, Code, Users } from "lucide-react"

export default function NowPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Now</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          What I'm focused on right now. Updated regularly to reflect my current priorities and constraints.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Last updated: December 2024
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            San Francisco, CA
          </div>
        </div>
      </section>

      {/* Current Photo & Status */}
      <section className="mb-16">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-4xl">🌊</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Current Focus</h2>
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  Building the future of education at Network School, where I'm exploring how technology can enhance
                  rather than replace human learning and connection. Currently based in San Francisco, spending my days
                  between code, philosophical inquiry, and music composition.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This winter, I'm particularly focused on understanding how AI tools can augment creative processes
                  without diminishing human agency—a theme that runs through both my technical work and philosophical
                  writing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Current Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">What I'm Working On</h2>
        <div className="space-y-6">
          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Code className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Harmony Engine 2.0</h3>
                  <p className="text-muted-foreground mb-3">
                    Rebuilding my AI music composition tool with a focus on real-time collaboration and more intuitive
                    harmonic suggestions. The goal is to create something that feels like having a thoughtful musical
                    conversation partner.
                  </p>
                  <Badge variant="secondary">Active Development</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Essay Series: "Thoughtful Technology"</h3>
                  <p className="text-muted-foreground mb-3">
                    A collection of essays exploring how we can build technology that enhances human flourishing. Topics
                    include digital minimalism, AI ethics, and the philosophy of interface design.
                  </p>
                  <Badge variant="secondary">Writing</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Network School Platform</h3>
                  <p className="text-muted-foreground mb-3">
                    Building tools to support distributed learning communities. This includes peer-to-peer knowledge
                    sharing systems and collaborative research platforms.
                  </p>
                  <Badge variant="secondary">Research & Development</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Current Learning */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">What I'm Learning</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Music className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Advanced Music Theory</h3>
                  <p className="text-muted-foreground text-sm">
                    Diving deeper into jazz harmony and modal composition to inform my AI music tools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Focus className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cognitive Science</h3>
                  <p className="text-muted-foreground text-sm">
                    Understanding how attention and memory work to build better learning tools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Current Constraints */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Current Constraints</h2>
        <Card className="border-border/50 bg-muted/20">
          <CardContent className="p-6">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>
                  <strong className="text-foreground">Time:</strong> Balancing deep work with Network School
                  responsibilities
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>
                  <strong className="text-foreground">Focus:</strong> Limiting new projects to finish current ones well
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>
                  <strong className="text-foreground">Location:</strong> San Francisco through spring 2025
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Personal */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Life Outside Work</h2>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              When I'm not coding or writing, you'll find me exploring San Francisco's hiking trails, experimenting with
              ambient music composition, or diving into books about consciousness and complexity theory.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently reading: "The Mind in the Cave" by David Lewis-Williams and "Gödel, Escher, Bach" (for the third
              time) by Douglas Hofstadter.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Connect */}
      <section className="text-center">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Want to Connect?</h2>
            <p className="text-muted-foreground mb-6">
              I'm always interested in conversations about technology, philosophy, music, or any intersection of these
              topics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="mailto:hello@adampang.com">Send me an email</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/work-with-me">Work with me</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}