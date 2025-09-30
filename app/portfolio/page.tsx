"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, ExternalLink, Github, Copy } from "lucide-react"
import Link from "next/link"

// Sample portfolio data - in real app this would come from a database
const portfolioApps = [
  {
    id: 1,
    title: "TaskFlow Pro",
    description: "AI-powered project management with smart automation",
    status: "live",
    category: "productivity",
    image: "/modern-task-management-app-interface.jpg",
    link: "https://taskflow.example.com",
    github: "https://github.com/anchormarianas/taskflow",
    tags: ["React", "AI", "SaaS"],
  },
  {
    id: 2,
    title: "CodeSnap",
    description: "Beautiful code screenshot generator for developers",
    status: "live",
    category: "developer-tools",
    image: "/code-editor-syntax.png",
    link: "https://codesnap.example.com",
    github: "https://github.com/anchormarianas/codesnap",
    tags: ["Next.js", "Canvas", "Developer Tools"],
  },
  {
    id: 3,
    title: "MindMap Studio",
    description: "Collaborative mind mapping for creative teams",
    status: "beta",
    category: "creativity",
    image: "/mind-mapping-software-interface.jpg",
    link: "https://mindmap.example.com",
    github: "https://github.com/anchormarianas/mindmap",
    tags: ["React", "Collaboration", "Design"],
  },
  {
    id: 4,
    title: "DataViz Builder",
    description: "No-code data visualization platform",
    status: "coming-soon",
    category: "analytics",
    image: "/data-visualization-dashboard.png",
    link: "",
    github: "",
    tags: ["D3.js", "No-code", "Analytics"],
  },
  {
    id: 5,
    title: "WriteFlow",
    description: "Distraction-free writing environment with AI assistance",
    status: "live",
    category: "productivity",
    image: "/minimal-writing-app-interface.jpg",
    link: "https://writeflow.example.com",
    github: "https://github.com/anchormarianas/writeflow",
    tags: ["AI", "Writing", "Minimalism"],
  },
  {
    id: 6,
    title: "SoundScape",
    description: "Ambient sound generator for focus and relaxation",
    status: "live",
    category: "wellness",
    image: "/audio-waveform-visualization.png",
    link: "https://soundscape.example.com",
    github: "https://github.com/anchormarianas/soundscape",
    tags: ["Audio", "Wellness", "PWA"],
  },
  // Generate placeholder apps for the remaining 94
  ...Array.from({ length: 94 }, (_, i) => ({
    id: i + 7,
    title: `App ${i + 7}`,
    description: "Coming soon - part of the 100 apps journey",
    status: "planned" as const,
    category: ["productivity", "developer-tools", "creativity", "analytics", "wellness"][i % 5],
    image: "/app-interface.jpg",
    link: "",
    github: "",
    tags: ["Coming Soon"],
  })),
]

const categories = [
  { id: "all", label: "All Apps", count: 100 },
  { id: "live", label: "Live", count: 6 },
  { id: "beta", label: "Beta", count: 1 },
  { id: "productivity", label: "Productivity", count: 20 },
  { id: "developer-tools", label: "Developer Tools", count: 25 },
  { id: "creativity", label: "Creativity", count: 18 },
  { id: "analytics", label: "Analytics", count: 15 },
  { id: "wellness", label: "Wellness", count: 12 },
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">AnchorMarianas</span>
            </Link>
            <div className="text-sm text-muted-foreground">Portfolio • {filteredApps.length} of 100 apps</div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Header */}
        <section className="py-12 px-6 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">The 100 Apps Portfolio</h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                A comprehensive collection of digital products, tools, and experiments. Each app represents a step in
                the journey of building innovative solutions.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search apps..."
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
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
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
                <p className="text-muted-foreground">No apps found matching your criteria.</p>
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
          </div>
        </section>
      </div>

      {/* App Detail Modal */}
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