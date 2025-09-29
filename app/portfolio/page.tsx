"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, ExternalLink, Github, Copy } from "lucide-react"
import Link from "next/link"

// Sample portfolio data - adapted to Adam's actual work
const portfolioApps = [
  {
    id: 1,
    title: "Harmony Engine",
    description: "AI-powered music composition with smart harmonic suggestions",
    status: "live",
    category: "creativity",
    image: "/placeholder.svg",
    link: "https://harmony-engine.vercel.app",
    github: "https://github.com/adampang/harmony-engine",
    tags: ["React", "AI", "Music"],
  },
  {
    id: 2,
    title: "Philosophy Essays",
    description: "Platform for exploring deep thoughts on code, life, and meaning",
    status: "live",
    category: "writing",
    image: "/placeholder.svg",
    link: "https://essays.adampang.com",
    github: "https://github.com/adampang/essays",
    tags: ["Next.js", "MDX", "Philosophy"],
  },
  {
    id: 3,
    title: "Stream Notes",
    description: "Real-time thought streaming and note-taking platform",
    status: "beta",
    category: "productivity",
    image: "/placeholder.svg",
    link: "https://stream.adampang.com",
    github: "https://github.com/adampang/stream",
    tags: ["React", "Real-time", "Notes"],
  },
  {
    id: 4,
    title: "Code Visualizer",
    description: "Beautiful visualization of code structure and dependencies",
    status: "coming-soon",
    category: "developer-tools",
    image: "/placeholder.svg",
    link: "",
    github: "",
    tags: ["D3.js", "Visualization", "Developer Tools"],
  },
  {
    id: 5,
    title: "Minimal Writer",
    description: "Distraction-free writing environment with focus modes",
    status: "live",
    category: "productivity",
    image: "/placeholder.svg",
    link: "https://writer.adampang.com",
    github: "https://github.com/adampang/writer",
    tags: ["Minimal", "Writing", "Focus"],
  },
  {
    id: 6,
    title: "Sound Designer",
    description: "Web-based tool for creating ambient soundscapes",
    status: "live",
    category: "creativity",
    image: "/placeholder.svg",
    link: "https://sounds.adampang.com",
    github: "https://github.com/adampang/sounds",
    tags: ["Audio", "Web Audio API", "Creative"],
  },
  // Placeholder projects for future work
  ...Array.from({ length: 14 }, (_, i) => ({
    id: i + 7,
    title: `Project ${i + 7}`,
    description: "Coming soon - part of the ongoing creative journey",
    status: "planned" as const,
    category: ["productivity", "developer-tools", "creativity", "writing"][i % 4],
    image: "/placeholder.svg",
    link: "",
    github: "",
    tags: ["Coming Soon"],
  })),
]

const categories = [
  { id: "all", label: "All Projects", count: 20 },
  { id: "live", label: "Live", count: 4 },
  { id: "beta", label: "Beta", count: 1 },
  { id: "productivity", label: "Productivity", count: 6 },
  { id: "developer-tools", label: "Developer Tools", count: 4 },
  { id: "creativity", label: "Creativity", count: 6 },
  { id: "writing", label: "Writing", count: 4 },
]

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedApp, setSelectedApp] = useState<(typeof portfolioApps)[0] | null>(null)

  const filteredApps = portfolioApps.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || app.category === selectedCategory || app.status === selectedCategory
    return matchesSearch && matchesCategory
  })

  const copyAppLink = (app: (typeof portfolioApps)[0]) => {
    const text = `${app.title} - ${app.description}\n${app.link || "Coming soon"}`
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        {/* Header */}
        <section className="mb-12 border-b border-border pb-12">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Creative Portfolio</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              A comprehensive collection of digital projects, experiments, and creative explorations. Each project represents a step in the journey of building meaningful solutions.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <div key={app.id} className="group cursor-pointer" onClick={() => setSelectedApp(app)}>
                <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <img
                      src={app.image || "/placeholder.svg"}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={app.status === "live" ? "default" : "secondary"}
                        className={`text-xs ${
                          app.status === "live"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : app.status === "beta"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {app.status === "live"
                          ? "Live"
                          : app.status === "beta"
                            ? "Beta"
                            : app.status === "coming-soon"
                              ? "Soon"
                              : "Planned"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-muted-foreground text-sm text-pretty mb-3">{app.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {app.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {app.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{app.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Project Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
            <div className="relative">
              <img
                src={selectedApp.image || "/placeholder.svg"}
                alt={selectedApp.title}
                className="w-full h-64 object-cover"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
                onClick={() => setSelectedApp(null)}
              >
                ✕
              </Button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedApp.title}</h2>
                  <Badge
                    className={`${
                      selectedApp.status === "live"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : selectedApp.status === "beta"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {selectedApp.status === "live"
                      ? "Live"
                      : selectedApp.status === "beta"
                        ? "Beta"
                        : selectedApp.status === "coming-soon"
                          ? "Coming Soon"
                          : "Planned"}
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">{selectedApp.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedApp.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {selectedApp.link && (
                  <Button asChild className="flex-1">
                    <Link href={selectedApp.link} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </Link>
                  </Button>
                )}
                {selectedApp.github && (
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href={selectedApp.github} target="_blank">
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Link>
                  </Button>
                )}
                <Button variant="outline" onClick={() => copyAppLink(selectedApp)} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}