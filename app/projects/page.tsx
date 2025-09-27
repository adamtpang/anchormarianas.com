import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar } from "lucide-react"

// Mock data - in a real app this would come from a CMS or database
const projects = [
  {
    id: "harmony-engine",
    title: "Harmony Engine",
    description: "An AI-powered music composition tool that helps musicians explore new harmonic possibilities.",
    longDescription:
      "Built with React and TensorFlow.js, this tool analyzes musical patterns and suggests chord progressions that maintain harmonic coherence while introducing creative variations.",
    date: "2024-12-12",
    status: "Active",
    tags: ["React", "AI", "Music", "TensorFlow"],
    links: {
      demo: "https://harmony-engine.demo.com",
      github: "https://github.com/adampang/harmony-engine",
    },
    featured: true,
  },
  {
    id: "mindful-reader",
    title: "Mindful Reader",
    description: "A distraction-free reading app that promotes deep focus and comprehension.",
    longDescription:
      "Designed to combat digital overwhelm, this app strips away all non-essential elements and uses typography and spacing to create an optimal reading environment.",
    date: "2024-11-20",
    status: "Active",
    tags: ["Next.js", "Design", "Minimalism"],
    links: {
      demo: "https://mindful-reader.app",
      github: "https://github.com/adampang/mindful-reader",
    },
    featured: true,
  },
  {
    id: "thought-mapper",
    title: "Thought Mapper",
    description: "A visual tool for connecting ideas and building knowledge graphs.",
    longDescription:
      "Helps researchers and thinkers visualize connections between concepts, creating dynamic knowledge maps that evolve with understanding.",
    date: "2024-10-15",
    status: "Beta",
    tags: ["D3.js", "Knowledge", "Visualization"],
    links: {
      demo: "https://thought-mapper.app",
    },
    featured: false,
  },
  {
    id: "focus-timer",
    title: "Focus Timer",
    description: "A minimalist Pomodoro timer with ambient soundscapes.",
    longDescription:
      "Combines time management techniques with carefully curated ambient sounds to create the perfect environment for deep work.",
    date: "2024-09-30",
    status: "Complete",
    tags: ["Vue.js", "Productivity", "Audio"],
    links: {
      demo: "https://focus-timer.app",
      github: "https://github.com/adampang/focus-timer",
    },
    featured: false,
  },
  {
    id: "code-philosophy",
    title: "Code Philosophy",
    description: "A collection of essays and tools exploring the philosophical dimensions of programming.",
    longDescription:
      "An ongoing project that examines how programming practices reflect and shape our understanding of logic, ethics, and human nature.",
    date: "2024-08-15",
    status: "Ongoing",
    tags: ["Philosophy", "Writing", "Education"],
    links: {
      demo: "https://code-philosophy.com",
    },
    featured: false,
  },
  {
    id: "network-school-tools",
    title: "Network School Tools",
    description: "Educational technology tools for distributed learning communities.",
    longDescription:
      "A suite of tools designed to support peer-to-peer learning, knowledge sharing, and community building in educational networks.",
    date: "2024-07-01",
    status: "Active",
    tags: ["Education", "Community", "React", "Node.js"],
    links: {
      demo: "https://tools.networkschool.com",
    },
    featured: true,
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Tools, experiments, and applications I've built to explore ideas and solve problems.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">Featured</Badge>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <CardTitle className="group-hover:text-accent transition-colors text-xl">{project.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{project.longDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {project.links.demo && (
                      <Button asChild size="sm">
                        <Link
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-8">Other Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-md transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                </div>
                <CardTitle className="group-hover:text-accent transition-colors text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.links.demo && (
                      <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                        <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16 pt-16 border-t border-border">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Interested in collaborating?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always open to working on interesting projects that push the boundaries of technology and human potential.
        </p>
        <Button asChild>
          <Link href="/work-with-me">Get in touch</Link>
        </Button>
      </section>
    </div>
  )
}