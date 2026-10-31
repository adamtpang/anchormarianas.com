"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  type SourceField,
  type Sources,
  type Status,
  type Successor,
  type Target,
  STARTER_INDUSTRIES,
  STATUSES,
  SUCCESSORS,
  cleanHttpUrl,
  newId,
  parseCharterDate,
  parseCount,
  parseMoney,
  parseYears,
} from "@/lib/buy/model"
import { CallHistory, CallLogger } from "./call-log"
import { OutreachDrafts } from "./drafts"
import { useBuy } from "./provider"

type Draft = {
  name: string
  industry: string
  city: string
  website: string
  phone: string
  revenue: string
  profit: string
  years: string
  ownerName: string
  ownerAge: string
  successor: Successor
  status: Status
  notes: string
  sample: boolean
  sources: Sources
  zip: string
  charterDate: string
  preparerCount: string
  credentials: string
  licensedCpaFirm: Successor
  spokeWithOwner: boolean
}

function emptyDraft(): Draft {
  return {
    name: "",
    industry: "",
    city: "",
    website: "",
    phone: "",
    revenue: "",
    profit: "",
    years: "",
    ownerName: "",
    ownerAge: "",
    successor: "unknown",
    status: "New",
    notes: "",
    sample: false,
    sources: {},
    zip: "",
    charterDate: "",
    preparerCount: "",
    credentials: "",
    licensedCpaFirm: "unknown",
    spokeWithOwner: false,
  }
}

function toDraft(target: Target): Draft {
  return {
    name: target.name,
    industry: target.industry,
    city: target.city,
    website: target.website,
    phone: target.phone,
    revenue: target.revenue == null ? "" : String(target.revenue),
    profit: target.profit == null ? "" : String(target.profit),
    years: target.yearsInBusiness == null ? "" : String(target.yearsInBusiness),
    ownerName: target.ownerName,
    ownerAge: target.ownerAge,
    successor: target.successor,
    status: target.status,
    notes: target.notes,
    sample: target.sample,
    sources: { ...target.sources },
    zip: target.zip,
    charterDate: target.charterDate,
    preparerCount: target.preparerCount == null ? "" : String(target.preparerCount),
    credentials: target.credentials,
    licensedCpaFirm: target.licensedCpaFirm,
    spokeWithOwner: target.spokeWithOwner,
  }
}

function Pair({
  label,
  value,
  onChange,
  source,
  onSource,
  type = "text",
  list,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  source: string
  onSource: (value: string) => void
  type?: string
  list?: string
}) {
  const fieldId = `target-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  return (
    <div className="space-y-2">
      <label className="block space-y-1.5" htmlFor={fieldId}>
        <span className="text-sm font-medium">{label}</span>
        <Input id={fieldId} type={type} value={value} list={list} onChange={(event) => onChange(event.target.value)} />
      </label>
      <label className="block space-y-1.5" htmlFor={`${fieldId}-source`}>
        <span className="text-xs text-muted-foreground">Source URL for {label.toLowerCase()}</span>
        <Input
          id={`${fieldId}-source`}
          type="url"
          inputMode="url"
          value={source}
          placeholder="https://example.com/source"
          spellCheck={false}
          onChange={(event) => onSource(event.target.value)}
        />
      </label>
    </div>
  )
}

export function TargetForm({ mode, targetId }: { mode: "new" | "edit"; targetId?: string }) {
  const router = useRouter()
  const { ready, targets, saveTarget, deleteTarget, setSpokeWithOwner } = useBuy()
  const existing = targets.find((target) => target.id === targetId)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [createdId, setCreatedId] = useState("")
  const [missing, setMissing] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!ready || draft || missing) return
    if (mode === "edit") {
      if (!existing) {
        setMissing(true)
        return
      }
      setDraft(toDraft(existing))
      return
    }
    setCreatedId(newId())
    setDraft(emptyDraft())
  }, [ready, draft, missing, mode, existing])

  function update(key: keyof Draft, value: string) {
    setDraft((current) => (current ? { ...current, [key]: value } : current))
  }

  function setSource(field: SourceField, value: string) {
    setDraft((current) => (current ? { ...current, sources: { ...current.sources, [field]: value } } : current))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!draft) return
    const problems: string[] = []
    const name = draft.name.trim()
    if (name.length < 2) problems.push("Enter the business name.")
    const website = cleanHttpUrl(draft.website)
    const revenue = parseMoney(draft.revenue)
    const profit = parseMoney(draft.profit)
    const years = parseYears(draft.years)
    const charterDate = parseCharterDate(draft.charterDate)
    const preparerCount = parseCount(draft.preparerCount)
    if (website === "invalid") problems.push("Website must be an http or https URL, or blank.")
    if (revenue === "invalid" || profit === "invalid") problems.push("Revenue and profit must be numbers, or blank.")
    if (years === "invalid") problems.push("Years in business must be a whole number, or blank.")
    if (charterDate === "invalid") problems.push("Charter date must be YYYY-MM-DD, or blank.")
    if (preparerCount === "invalid") problems.push("Preparer count must be a whole number, or blank.")
    const sources: Sources = {}
    for (const [field, url] of Object.entries(draft.sources) as [SourceField, string][]) {
      const cleaned = cleanHttpUrl(url)
      if (cleaned === "invalid") problems.push(`Source URL for ${field} must be http or https.`)
      else if (cleaned) sources[field] = cleaned
    }
    if (problems.length > 0 || website === "invalid" || revenue === "invalid" || profit === "invalid" || years === "invalid" || charterDate === "invalid" || preparerCount === "invalid") {
      setErrors(problems)
      setMessage("")
      return
    }
    const id = mode === "edit" ? targetId || "" : createdId
    if (!id) return
    const target: Target = {
      id,
      name,
      industry: draft.industry.trim(),
      city: draft.city.trim(),
      website: website || "",
      phone: draft.phone.trim(),
      revenue,
      profit,
      yearsInBusiness: years,
      ownerName: draft.ownerName.trim(),
      ownerAge: draft.ownerAge.trim(),
      successor: draft.successor,
      sources,
      notes: draft.notes.trim(),
      status: draft.status,
      calls: existing?.calls ?? [],
      sample: draft.sample,
      zip: draft.zip.trim(),
      charterDate: charterDate || "",
      preparerCount,
      credentials: draft.credentials.trim(),
      licensedCpaFirm: draft.licensedCpaFirm,
      spokeWithOwner: draft.spokeWithOwner,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveTarget(target)
    setErrors([])
    setMessage("Saved on this device.")
    if (mode === "new") router.push(`/buy/targets/${id}`)
  }

  if (!ready || (!draft && !missing)) return <p>Loading the desk saved on this device.</p>
  if (missing || !draft) {
    return (
      <div className="space-y-3">
        <h2>Target not on this device</h2>
        <p>This browser does not have that record.</p>
        <Link href="/buy" className="underline">Back to targets</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <h2>{mode === "new" ? "Add a target" : "Edit target"}</h2>
        <p className="text-sm text-muted-foreground">
          Each fact can keep its own source URL. Saving writes only to this browser.
        </p>
      </div>
      <form onSubmit={submit} className="space-y-6">
        {errors.length > 0 ? (
          <ul role="alert" className="list-disc space-y-1 pl-5 text-sm">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
        <div className="grid gap-6 md:grid-cols-2">
          <Pair label="Business name" value={draft.name} onChange={(value) => update("name", value)} source={draft.sources.name || ""} onSource={(value) => setSource("name", value)} />
          <Pair label="Industry" value={draft.industry} onChange={(value) => update("industry", value)} source={draft.sources.industry || ""} onSource={(value) => setSource("industry", value)} list="starter-industries" />
          <Pair label="City or metro" value={draft.city} onChange={(value) => update("city", value)} source={draft.sources.city || ""} onSource={(value) => setSource("city", value)} />
          <Pair label="Website" value={draft.website} onChange={(value) => update("website", value)} source={draft.sources.website || ""} onSource={(value) => setSource("website", value)} type="url" />
          <Pair label="Phone" value={draft.phone} onChange={(value) => update("phone", value)} source={draft.sources.phone || ""} onSource={(value) => setSource("phone", value)} type="tel" />
          <Pair label="Estimated revenue" value={draft.revenue} onChange={(value) => update("revenue", value)} source={draft.sources.revenue || ""} onSource={(value) => setSource("revenue", value)} />
          <Pair label="Estimated profit" value={draft.profit} onChange={(value) => update("profit", value)} source={draft.sources.profit || ""} onSource={(value) => setSource("profit", value)} />
          <Pair label="Years in business" value={draft.years} onChange={(value) => update("years", value)} source={draft.sources.yearsInBusiness || ""} onSource={(value) => setSource("yearsInBusiness", value)} />
          <Pair label="Owner name" value={draft.ownerName} onChange={(value) => update("ownerName", value)} source={draft.sources.ownerName || ""} onSource={(value) => setSource("ownerName", value)} />
          <Pair label="Owner age" value={draft.ownerAge} onChange={(value) => update("ownerAge", value)} source={draft.sources.ownerAge || ""} onSource={(value) => setSource("ownerAge", value)} />
        </div>
        <datalist id="starter-industries">
          {STARTER_INDUSTRIES.map((industry) => (
            <option key={industry} value={industry} />
          ))}
        </datalist>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">Has a successor</span>
              <select className="w-full border border-input bg-background px-3 py-2 text-base" value={draft.successor} onChange={(event) => update("successor", event.target.value)}>
                {SUCCESSORS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5" htmlFor="target-successor-source">
              <span className="text-xs text-muted-foreground">Source URL for successor</span>
              <Input id="target-successor-source" type="url" value={draft.sources.successor || ""} placeholder="https://example.com/source" spellCheck={false} onChange={(event) => setSource("successor", event.target.value)} />
            </label>
          </div>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Status</span>
            <select className="w-full border border-input bg-background px-3 py-2 text-base" value={draft.status} onChange={(event) => update("status", event.target.value)}>
              {STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block space-y-1.5" htmlFor="target-zip">
            <span className="text-sm font-medium">ZIP</span>
            <Input id="target-zip" value={draft.zip} onChange={(event) => update("zip", event.target.value)} />
          </label>
          <label className="block space-y-1.5" htmlFor="target-charter">
            <span className="text-sm font-medium">Charter date</span>
            <Input id="target-charter" value={draft.charterDate} placeholder="YYYY-MM-DD" onChange={(event) => update("charterDate", event.target.value)} />
          </label>
          <label className="block space-y-1.5" htmlFor="target-preparers">
            <span className="text-sm font-medium">Preparer count</span>
            <Input id="target-preparers" inputMode="numeric" value={draft.preparerCount} onChange={(event) => update("preparerCount", event.target.value)} />
          </label>
          <label className="block space-y-1.5" htmlFor="target-credentials">
            <span className="text-sm font-medium">Credentials</span>
            <Input id="target-credentials" value={draft.credentials} placeholder="CPA, EA" onChange={(event) => update("credentials", event.target.value)} />
          </label>
          <div className="space-y-2">
            <label className="block space-y-1.5" htmlFor="target-cpa-firm">
              <span className="text-sm font-medium">Licensed CPA firm</span>
              <select id="target-cpa-firm" className="w-full border border-input bg-background px-3 py-2 text-base" value={draft.licensedCpaFirm} onChange={(event) => update("licensedCpaFirm", event.target.value)}>
                {SUCCESSORS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <p className="text-xs text-muted-foreground">
              Check by hand at{" "}
              <a className="underline" href="https://portal.tsbpa.texas.gov/php/fpl/frmlookup.php" target="_blank" rel="noreferrer">the TSBPA firm lookup</a>.
            </p>
          </div>
        </div>
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={draft.spokeWithOwner}
            onChange={(event) => {
              const checked = event.target.checked
              setDraft((current) => (current ? { ...current, spokeWithOwner: checked } : current))
              if (existing) setSpokeWithOwner(existing.id, checked)
            }}
          />
          Spoke with owner
        </label>
        <label className="block space-y-1.5" htmlFor="target-notes">
          <span className="text-sm font-medium">Notes</span>
          <Textarea id="target-notes" value={draft.notes} onChange={(event) => update("notes", event.target.value)} rows={4} />
        </label>
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input type="checkbox" checked={draft.sample} onChange={(event) => setDraft((current) => (current ? { ...current, sample: event.target.checked } : current))} />
          Mark as fictional sample data
        </label>
        <div className="flex flex-wrap gap-3">
          <button className="agency-button" type="submit">Save on this device</button>
          <Link href="/buy" className="inline-flex min-h-11 items-center px-3 text-sm underline">Cancel</Link>
        </div>
        {message ? <p role="status" className="text-sm">{message}</p> : null}
      </form>

      <OutreachDrafts name={draft.name} ownerName={draft.ownerName} city={draft.city} />

      {mode === "edit" && existing ? (
        <section className="space-y-4 border-t border-border pt-8">
          <h2>Call log</h2>
          <CallLogger target={existing} />
          <CallHistory target={existing} />
        </section>
      ) : null}

      {mode === "edit" && existing ? (
        <div className="border-t border-border pt-6">
          {confirmDelete ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="min-h-11 rounded-md border border-foreground px-3 text-sm"
                onClick={() => {
                  deleteTarget(existing.id)
                  router.push("/buy")
                }}
              >
                Confirm remove
              </button>
              <button type="button" className="min-h-11 px-3 text-sm underline" onClick={() => setConfirmDelete(false)}>
                Keep target
              </button>
            </div>
          ) : (
            <button type="button" className="min-h-11 px-3 text-sm underline" onClick={() => setConfirmDelete(true)}>
              Remove target
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}
