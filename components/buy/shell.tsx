"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import { CONVERSATION_GOAL, ownerConversationCount } from "@/lib/buy/conversations"
import { localToday } from "@/lib/buy/model"
import { isDueToday } from "@/lib/buy/queue"
import { useBuy } from "./provider"

const LINKS = [
  { href: "/buy", label: "Targets" },
  { href: "/buy/queue", label: "Call queue" },
  { href: "/buy/targets/new", label: "Add target" },
  { href: "/buy/import", label: "Import" },
]

function current(href: string, path: string) {
  if (href === "/buy") return path === "/buy" || (path.startsWith("/buy/targets/") && path !== "/buy/targets/new")
  return path === href || path.startsWith(`${href}/`)
}

export function BuyShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { ready, error, targets, clearSamples, reset } = useBuy()
  const [today, setToday] = useState("")
  useEffect(() => setToday(localToday()), [])
  const samples = targets.some((target) => target.sample)
  const due = today ? targets.filter((target) => isDueToday(target, today)).length : 0
  const conversations = ownerConversationCount(targets)

  return (
    <div>
      <div className="border-b border-border">
        <div className="agency-shell py-8">
          <p className="text-sm text-muted-foreground">Private desk</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1>Buy desk</h1>
            <form method="post" action="/api/buy-gate">
              <input type="hidden" name="action" value="logout" />
              <button type="submit" className="min-h-11 px-3 text-sm underline">
                Lock desk
              </button>
            </form>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Targets, notes, and call logs stay in this browser&apos;s localStorage. They are not uploaded, and they are not in the repository.
          </p>
          <p className="mt-3 text-sm font-medium">Owner conversations: {conversations} of {CONVERSATION_GOAL}</p>
          <nav aria-label="Buy desk" className="mt-5 flex flex-wrap gap-2">
            {LINKS.map((link) => {
              const active = current(link.href, pathname)
              const label = link.href === "/buy/queue" && today ? `${link.label} (${due})` : link.label
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-md border px-3 text-sm ${active ? "border-foreground bg-foreground text-background" : "border-border"}`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
          {samples ? (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex min-h-8 items-center rounded-full border border-border px-3 text-xs font-medium">
                Sample data
              </span>
              <p className="text-sm text-muted-foreground">These businesses are fictional. Remove them before you enter real owners.</p>
              <button type="button" className="min-h-11 px-3 text-sm underline" onClick={clearSamples}>
                Remove sample data
              </button>
            </div>
          ) : null}
          {error ? (
            <div className="mt-5 space-y-2" role="alert">
              <p className="text-sm">{error}</p>
              <button type="button" className="min-h-11 px-3 text-sm underline" onClick={reset}>
                Erase the unreadable save and start over
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="agency-shell py-8">{ready ? children : <p>Loading the desk saved on this device.</p>}</div>
    </div>
  )
}
