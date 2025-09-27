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
    handle: "@anchormarianas",
    url: "https://twitter.com/anchormarianas",
    description: "Daily thoughts on building, shipping, and the 100 apps journey",
    icon: Twitter,
    category: "social",
    followers: "2.1K",
    public: true,
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@anchormarianas",
    url: "https://github.com/anchormarianas",
    description: "Open source projects and code from the 100 apps portfolio",
    icon: Github,
    category: "code",
    followers: "892",
    public: true,
  },
  {
    id: "substack",
    name: "Substack Newsletter",
    handle: "Building in Public",
    url: "https://anchormarianas.substack.com",
    description: "Weekly deep dives into product development and entrepreneurship",
    icon: FileText,
    category: "writing",
    followers: "1.2K",
    public: true,
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    handle: "@anchormarianas",
    url: "https://soundcloud.com/anchormarianas",
    description: "Ambient music and soundscapes for focus and creativity",
    icon: Music,
    category: "music",
    followers: "456",
    public: true,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    handle: "@anchormarianas",
    url: "https://pinterest.com/anchormarianas",
    description: "Design inspiration, UI patterns, and visual references",
    icon: Palette,
    category: "design",
    followers: "3.4K",
    public: true,
  },
  {
    id: "dribbble",
    name: "Dribbble",
    handle: "@anchormarianas",
    url: "https://dribbble.com/anchormarianas",
    description: "UI/UX design shots and creative explorations",
    icon: Camera,
    category: "design",
    followers: "678",
    public: true,
  },
]

const projectLinks = [
  {
    id: "taskflow",
    name: "TaskFlow Pro",
    url: "https://taskflow.example.com",
    description: "AI-powered project management platform",
    status: "live",
    category: "apps",
  },
  {
    id: "codesnap",
    name: "CodeSnap",
    url: "https://codesnap.example.com",
    description: "Beautiful code screenshot generator",
    status: "live",
    category: "apps",
  },
  {
    id: "mindmap",
    name: "MindMap Studio",
    url: "https://mindmap.example.com",
    description: "Collaborative mind mapping tool",
    status: "beta",
    category: "apps",
  },
  {
    id: "writeflow",
    name: "WriteFlow",
    url: "https://writeflow.example.com",
    description: "Distraction-free writing environment",
    status: "live",
    category: "apps",
  },
  {
    id: "soundscape",
    name: "SoundScape",
    url: "https://soundscape.example.com",
    description: "Ambient sound generator",
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
  const [copiedId, setCopiedId] = useState(null)

  const allLinks = [...socialLinks.filter((link) => link.public), ...projectLinks]

  const filteredLinks =
    selectedCategory === "all" ? allLinks : allLinks.filter((link) => link.category === selectedCategory)

  const copyLink = async (url, id) => {
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">AnchorMarianas</span>
            </Link>
            <div className="text-sm text-muted-foreground">All Links & Archive</div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Header */}
        <section className="py-12 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/60 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-accent-foreground">AM</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">AnchorMarianas Archive</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              Your central hub for all things AnchorMarianas. Follow the journey across platforms, explore live
              projects, and stay connected with the 100 apps mission.
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
          </div>
        </section>

        {/* Links Grid */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
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
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 px-6 bg-muted/30 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-accent mb-1">6</div>
                <div className="text-sm text-muted-foreground">Live Apps</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">8.7K</div>
                <div className="text-sm text-muted-foreground">Total Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">100</div>
                <div className="text-sm text-muted-foreground">Apps Goal</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">12%</div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-balance mb-4">Ready to Work Together?</h2>
            <p className="text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
              If you're interested in collaborating, have a project in mind, or just want to say hello, I'd love to hear
              from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/services">Start a Project</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="mailto:hello@anchormarianas.com">Send Email</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}