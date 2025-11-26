import { Badge } from "@/components/ui/badge"
import { Star, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Repo } from "@/lib/schemas"

interface AppCardProps {
  app: Repo
}

const statusConfig = {
  active: { label: "Active", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  beta: { label: "Beta", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  archived: { label: "Archived", className: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
  sunset: { label: "Sunset", className: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  building: { label: "Building", className: "bg-purple-500/10 text-purple-500 border-purple-500/20" }
}

export function AppCard({ app }: AppCardProps) {
  const hasDemo = !!app.demoUrl
  const status = app.status ? statusConfig[app.status] : null

  return (
    <Link
      href={app.demoUrl || app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative h-full bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:border-accent hover:shadow-md">
        <div className="p-5 space-y-3">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-accent transition-colors">
                {app.title}
              </h3>
              {status && (
                <Badge variant="outline" className={`${status.className} text-xs font-medium shrink-0`}>
                  {status.label}
                </Badge>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {app.oneLiner}
            </p>
          </div>

          {/* Stats */}
          {app.featuredStats && app.featuredStats.length > 0 && (
            <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
              {app.featuredStats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            {/* Topics */}
            <div className="flex flex-wrap gap-1.5">
              {app.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-accent">
              {hasDemo ? "Try" : "View"}
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* GitHub stars */}
          {app.stars > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500 pt-1">
              <Star className="w-3 h-3" />
              {app.stars}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
