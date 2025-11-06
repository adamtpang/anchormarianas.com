import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ExternalLink, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Team | AnchorMarianas",
  description: "Meet Adam Pangelinan, founder of AnchorMarianas.",
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-16 pb-12 px-6 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Team</h1>
            <p className="text-xl text-muted-foreground">
              Building products. Delivering for clients.
            </p>
          </div>
        </div>
      </section>

      {/* Team Member */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                <Image
                  src="/adam.jpg"
                  alt="Adam Pangelinan"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Adam Pangelinan</h2>
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
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://adamtomas.fun" target="_blank" rel="noopener noreferrer">
                    Personal Site
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://linkedin.com/in/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://github.com/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://x.com/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
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
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Let's work together</h2>
          <p className="text-lg text-muted-foreground">
            Have a project? Let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/services">
                See Services
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="mailto:adam@anchormarianas.com">
                Email Me
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
