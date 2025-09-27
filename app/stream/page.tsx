"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Heart, Share2, Calendar } from "lucide-react"

// Mock data - in a real app this would come from social APIs
const streamItems = [
  {
    id: "1",
    type: "note",
    content:
      "The best interfaces are invisible. They get out of the way and let you focus on what matters. This is why I'm obsessed with reducing cognitive load in everything I build.",
    date: "2024-12-18",
    tags: ["Design", "Philosophy"],
  },
  {
    id: "2",
    type: "link",
    content: "Fascinating piece on how AI might change the nature of creative work.",
    url: "https://example.com/ai-creativity",
    title: "The Future of AI and Creativity",
    description: "An exploration of how artificial intelligence tools are reshaping creative processes.",
    date: "2024-12-17",
    tags: ["AI", "Creativity"],
  },
  {
    id: "3",
    type: "quote",
    content:
      '"The real problem of humanity is the following: we have paleolithic emotions, medieval institutions, and god-like technology."',
    author: "E.O. Wilson",
    date: "2024-12-16",
    tags: ["Philosophy", "Technology"],
  },
  {
    id: "4",
    type: "note",
    content:
      "Working on a new music composition tool that uses AI to suggest harmonic progressions. The goal isn't to replace human creativity but to expand the palette of possibilities.",
    date: "2024-12-15",
    tags: ["Music", "AI", "Projects"],
  },
  {
    id: "5",
    type: "link",
    content: "This essay on digital minimalism really resonates with my current thinking.",
    url: "https://example.com/digital-minimalism",
    title: "The Case for Digital Minimalism",
    description: "Why less technology might lead to more meaningful lives.",
    date: "2024-12-14",
    tags: ["Minimalism", "Technology"],
  },
  {
    id: "6",
    type: "note",
    content:
      "Been thinking about how education needs to evolve. We're still teaching 20th century skills for 21st century problems. The future belongs to those who can think across disciplines.",
    date: "2024-12-13",
    tags: ["Education", "Future"],
  },
]

const filterOptions = ["All", "Links", "Notes", "Quotes"]

export default function StreamPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredItems = streamItems.filter((item) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Links") return item.type === "link"
    if (activeFilter === "Notes") return item.type === "note"
    if (activeFilter === "Quotes") return item.type === "quote"
    return true
  })

  const renderStreamItem = (item: any) => {
    switch (item.type) {
      case "note":
        return (
          <Card key={item.id} className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary">Note</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-4">{item.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "link":
        return (
          <Card key={item.id} className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary">Link</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-4">{item.content}</p>
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-sm font-medium"
                >
                  Read more →
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "quote":
        return (
          <Card key={item.id} className="border-border/50 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary">Quote</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
              <blockquote className="text-lg text-foreground leading-relaxed mb-4 italic border-l-4 border-accent pl-4">
                {item.content}
              </blockquote>
              <p className="text-muted-foreground mb-4">— {item.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Stream</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Quick thoughts, interesting links, and quotes that catch my attention. The fast lane of my thinking.
        </p>
      </section>

      {/* Filters */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {filterOptions.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className="h-9"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Stream Items */}
      <div className="space-y-6">{filteredItems.map((item) => renderStreamItem(item))}</div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}