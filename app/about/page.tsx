import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">About</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          I'm a developer, creator, and thinker exploring the intersection of technology, philosophy, and human
          potential.
        </p>
      </section>

      {/* Main Content */}
      <section className="mb-16">
        <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground">
          <p className="text-lg leading-relaxed mb-6">
            I build accessible, thoughtful digital experiences that enhance rather than diminish human capability. My
            work spans web development, AI-powered tools, and educational technology, always guided by the question:
            "How can this make people more capable and fulfilled?"
          </p>

          <p className="leading-relaxed mb-6">
            Currently, I'm building the future of education at <strong>Network School</strong>, where I explore how
            technology can support distributed learning communities and peer-to-peer knowledge sharing. I believe the
            most important problems of our time require interdisciplinary thinking—combining technical skills with
            philosophical inquiry and creative expression.
          </p>

          <p className="leading-relaxed mb-8">
            When I'm not coding, you'll find me composing ambient music, reading about consciousness and complexity
            theory, or hiking the trails around San Francisco. I'm particularly fascinated by how AI tools can augment
            human creativity without replacing the essentially human elements of insight, meaning-making, and aesthetic
            judgment.
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Background</h2>
        <div className="space-y-6">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Network School</h3>
                  <p className="text-muted-foreground">Developer & Researcher</p>
                </div>
                <Badge variant="secondary">2024 - Present</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Building tools and platforms for distributed learning communities. Exploring how technology can enhance
                peer-to-peer education and knowledge sharing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Independent Developer</h3>
                  <p className="text-muted-foreground">Full-stack Development & Consulting</p>
                </div>
                <Badge variant="secondary">2020 - 2024</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Developed web applications and tools for startups and established companies, with a focus on user
                experience and thoughtful design.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills & Interests */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Skills & Interests</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Technical</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "AI/ML", "Design Systems"].map(
                (skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ),
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Philosophy",
                "Music Composition",
                "Education",
                "Consciousness",
                "Digital Minimalism",
                "Complexity Theory",
              ].map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="text-center">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Let's Connect</h2>
            <p className="text-muted-foreground mb-6">
              I'm always interested in conversations about technology, philosophy, creativity, and the future of human
              potential.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="/start-here" className="flex items-center gap-2">
                  Start here
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
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