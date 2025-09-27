"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EssayFilters } from "@/components/essay-filters"
import { Clock, Calendar } from "lucide-react"

// Mock data - in a real app this would come from a CMS or database
const essays = [
  {
    id: "philosophy-of-code",
    title: "The Philosophy of Code",
    description: "Exploring the intersection of programming and philosophical thinking in modern software development.",
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["Philosophy", "Technology"],
    featured: true,
  },
  {
    id: "digital-minimalism",
    title: "The Art of Digital Minimalism",
    description: "How reducing digital noise can lead to more meaningful creative work and deeper thinking.",
    date: "2024-12-10",
    readTime: "12 min read",
    tags: ["Minimalism", "Technology", "Creativity"],
    featured: true,
  },
  {
    id: "thoughtful-software",
    title: "Building Thoughtful Software",
    description:
      "Why the future of technology depends on creating tools that enhance rather than diminish human agency.",
    date: "2024-12-05",
    readTime: "15 min read",
    tags: ["Technology", "Philosophy", "Design"],
    featured: true,
  },
  {
    id: "ai-creativity",
    title: "AI and the Future of Creativity",
    description: "Examining how artificial intelligence might augment rather than replace human creative expression.",
    date: "2024-11-28",
    readTime: "10 min read",
    tags: ["AI", "Creativity", "Future"],
  },
  {
    id: "music-consciousness",
    title: "Music as a Window to Consciousness",
    description: "What musical composition reveals about the nature of awareness and subjective experience.",
    date: "2024-11-20",
    readTime: "14 min read",
    tags: ["Music", "Philosophy", "Consciousness"],
  },
  {
    id: "education-transformation",
    title: "Transforming Education for the Digital Age",
    description: "How we can redesign learning systems to prepare minds for an uncertain future.",
    date: "2024-11-15",
    readTime: "11 min read",
    tags: ["Education", "Technology", "Future"],
  },
  {
    id: "attention-economy",
    title: "Escaping the Attention Economy",
    description: "Strategies for reclaiming focus and intentionality in a world designed to distract.",
    date: "2024-11-08",
    readTime: "9 min read",
    tags: ["Minimalism", "Technology", "Philosophy"],
  },
  {
    id: "design-ethics",
    title: "The Ethics of Interface Design",
    description: "Our moral responsibility as creators of digital experiences that shape human behavior.",
    date: "2024-10-30",
    readTime: "13 min read",
    tags: ["Design", "Philosophy", "Technology"],
  },
]

export default function EssaysPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleClearFilters = () => {
    setSelectedTags([])
    setSearchQuery("")
  }

  const filteredEssays = essays.filter((essay) => {
    const matchesSearch =
      searchQuery === "" ||
      essay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      essay.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => essay.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Essays</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Long-form thoughts on technology, philosophy, creativity, and the future of human potential.
        </p>
      </section>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <EssayFilters
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>

        {/* Essays List */}
        <main className="lg:col-span-3">
          <div className="space-y-6">
            {filteredEssays.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No essays found matching your criteria.</p>
              </div>
            ) : (
              filteredEssays.map((essay) => (
                <Card key={essay.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(essay.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {essay.readTime}
                        </div>
                      </div>
                      {essay.featured && <Badge variant="secondary">Featured</Badge>}
                    </div>
                    <CardTitle className="group-hover:text-accent transition-colors text-2xl">
                      <Link href={`/essays/${essay.id}`}>{essay.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">{essay.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {essay.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent transition-colors"
                            onClick={() => handleTagToggle(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/essays/${essay.id}`} className="text-accent hover:underline font-medium">
                        Read essay →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}