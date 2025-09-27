"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Twitter,
  Github,
  Music,
  FileText,
  Camera,
  Palette,
  Code,
  Headphones,
} from "lucide-react"
import Link from "next/link"

const socialLinks = [
  {
    id: "twitter",
    name: "Twitter / X",
    handle: "@adampang",
    url: "https://twitter.com/adampang",
    description: "Daily thoughts on building, philosophy, and music",
    icon: Twitter,
    category: "social",
    followers: "1.2K",
    public: true,
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@adampang",
    url: "https://github.com/adampang",
    description: "Open source projects and code from personal portfolio",
    icon: Github,
    category: "code",
    followers: "456",
    public: true,
  },
  {
    id: "substack",
    name: "Newsletter",
    handle: "Building & Philosophy",
    url: "https://adampang.substack.com",
    description: "Deep dives into technology, philosophy, and creative work",
    icon: FileText,
    category: "writing",
    followers: "892",
    public: true,
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    handle: "@adampang",
    url: "https://soundcloud.com/adampang",
    description: "Music compositions and experimental sound design",
    icon: Music,
    category: "music",
    followers: "234",
    public: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@adampang",
    url: "https://instagram.com/adampang",
    description: "Visual inspiration and behind-the-scenes creative process",
    icon: Camera,
    category: "design",
    followers: "678",
    public: true,
  },
]

const projectLinks = [
  {
    id: "harmony-engine",
    name: "Harmony Engine",
    url: "https://harmony-engine.vercel.app",
    description: "AI-powered music composition tool",
    status: "live",
    category: "apps",
  },
  {
    id: "code-philosophy",
    name: "Code Philosophy",
    url: "https://code-philosophy.vercel.app",
    description: "Essays on programming and thought",
    status: "live",
    category: "apps",
  },
  {
    id: "stream-app",
    name: "Stream Notes",
    url: "https://stream.adampang.com",
    description: "Real-time thought streaming platform",
    status: "beta",
    category: "apps",
  },
  {
    id: "minimal-writer",
    name: "Minimal Writer",
    url: "https://writer.adampang.com",
    description: "Distraction-free writing environment",
    status: "live",
    category: "apps",
  },
]

const categories = [
  { id: "all", label: "All Links", icon: ExternalLink },
  { id: "social", label: "Social", icon: Twitter },
  { id: "code", label: "Code", icon: Code },
  { id: "writing", label: "Writing", icon: FileText },
  { id: "music", label: "Music", icon: Headphones },
  { id: "design", label: "Design", icon: Palette },
  { id: "apps", label: "Apps", icon: ExternalLink },
]

export default function ArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const allLinks = [...socialLinks.filter((link) => link.public), ...projectLinks]

  const filteredLinks =
    selectedCategory === "all" ? allLinks : allLinks.filter((link) => link.category === selectedCategory)

  const copyLink = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        {/* Header */}
        <section className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/60 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent-foreground">AP</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Adam Pang Archive</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
            Your central hub for all things Adam Pang. Follow the journey across platforms, explore live
            projects, and stay connected with my work in code, music, and philosophy.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                <category.icon className="w-3 h-3 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Links Grid */}
        <section className="mb-20">
          <div className="grid gap-4">
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                className="bg-card rounded-xl border border-border p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {"icon" in link ? (
                        <link.icon className="w-6 h-6 text-accent" />
                      ) : (
                        <ExternalLink className="w-6 h-6 text-accent" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg truncate">{link.name}</h3>

                        {"handle" in link && <span className="text-sm text-muted-foreground">{link.handle}</span>}

                        {"followers" in link && (
                          <Badge variant="secondary" className="text-xs">
                            {link.followers} followers
                          </Badge>
                        )}

                        {"status" in link && (
                          <Badge
                            variant={link.status === "live" ? "default" : "secondary"}
                            className={`text-xs ${
                              link.status === "live"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {link.status}
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm text-pretty">{link.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyLink(link.url, link.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedId === link.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>

                    <Button asChild size="sm">
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLinks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No links found in this category.</p>
              <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                View All Links
              </Button>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-muted/30 rounded-2xl mb-12 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-accent mb-1">4</div>
              <div className="text-sm text-muted-foreground">Live Apps</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">3.2K</div>
              <div className="text-sm text-muted-foreground">Total Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">2</div>
              <div className="text-sm text-muted-foreground">Years Building</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-balance mb-4">Ready to Work Together?</h2>
          <p className="text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            If you're interested in collaborating, have a project in mind, or just want to say hello, I'd love to hear
            from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/work-with-me">Start a Project</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="mailto:hello@adampang.com">Send Email</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}