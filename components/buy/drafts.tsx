"use client"

import { useState } from "react"
import { buildDrafts } from "@/lib/buy/drafts"

export function OutreachDrafts({
  name,
  ownerName,
  city,
}: {
  name: string
  ownerName: string
  city: string
}) {
  const drafts = buildDrafts({ name, ownerName, city })
  const [copied, setCopied] = useState("")

  async function copy(label: string, text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
    } catch {
      setCopied("")
    }
  }

  return (
    <section className="space-y-4 border-t border-border pt-8">
      <h2>Drafts</h2>
      <p className="text-sm text-muted-foreground">Copy only. The desk does not call, text, or email.</p>
      {drafts.map((draft) => (
        <article key={draft.kind} className="space-y-2">
          <h3 className="text-base">{draft.label}</h3>
          <pre className="whitespace-pre-wrap rounded-md border border-border p-3 text-sm">{draft.text}</pre>
          <button type="button" className="min-h-11 rounded-md border border-foreground px-3 text-sm" onClick={() => void copy(draft.label, draft.text)}>
            Copy
          </button>
          {copied === draft.label ? <p role="status" className="text-sm">Copied.</p> : null}
        </article>
      ))}
    </section>
  )
}
