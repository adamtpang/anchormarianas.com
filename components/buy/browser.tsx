"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { exportTargetsCsv } from "@/lib/buy/csv"
import { applyFilters, DEFAULT_FILTERS, industryOptions, SORT_OPTIONS, type TargetFilters } from "@/lib/buy/filter"
import { formatMoney, STARTER_INDUSTRIES, STATUSES, SUCCESSORS, telHref, type Status, type Successor } from "@/lib/buy/model"
import { downloadText } from "./download"
import { useBuy } from "./provider"

const control = "w-full border border-input bg-background px-3 py-2 text-base"

export function TargetBrowser() {
  const { targets } = useBuy()
  const [filters, setFilters] = useState<TargetFilters>(DEFAULT_FILTERS)
  const result = useMemo(() => applyFilters(targets, filters), [targets, filters])
  const industries = useMemo(() => {
    const known = new Set<string>([...STARTER_INDUSTRIES, ...industryOptions(targets)])
    return [...known].sort((left, right) => left.localeCompare(right))
  }, [targets])

  function set<Key extends keyof TargetFilters>(key: Key, value: TargetFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2>Targets</h2>
        <button
          type="button"
          className="min-h-11 px-3 text-sm underline"
          onClick={() => downloadText("buy-targets.csv", exportTargetsCsv(result.targets))}
        >
          Export shown targets
        </button>
      </div>

      <section className="space-y-4 rounded-xl border border-border p-4" aria-label="Filter targets">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block space-y-1.5 sm:col-span-2">
            <span className="text-sm font-medium">Search name</span>
            <input className={control} value={filters.query} onChange={(event) => set("query", event.target.value)} placeholder="Business or owner" />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Industry</span>
            <select className={control} value={filters.industry} onChange={(event) => set("industry", event.target.value)}>
              <option value="">All industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Location</span>
            <input className={control} value={filters.location} onChange={(event) => set("location", event.target.value)} placeholder="City or metro" />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Status</span>
            <select className={control} value={filters.status} onChange={(event) => set("status", event.target.value as "" | Status)}>
              <option value="">Any stage</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Successor</span>
            <select className={control} value={filters.successor} onChange={(event) => set("successor", event.target.value as "" | Successor)}>
              <option value="">Any</option>
              {SUCCESSORS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Revenue min</span>
            <input className={control} inputMode="numeric" value={filters.revenueMin} onChange={(event) => set("revenueMin", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Revenue max</span>
            <input className={control} inputMode="numeric" value={filters.revenueMax} onChange={(event) => set("revenueMax", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Profit min</span>
            <input className={control} inputMode="numeric" value={filters.profitMin} onChange={(event) => set("profitMin", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Profit max</span>
            <input className={control} inputMode="numeric" value={filters.profitMax} onChange={(event) => set("profitMax", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Owner age min</span>
            <input className={control} inputMode="numeric" value={filters.ageMin} onChange={(event) => set("ageMin", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Owner age max</span>
            <input className={control} inputMode="numeric" value={filters.ageMax} onChange={(event) => set("ageMax", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Years min</span>
            <input className={control} inputMode="numeric" value={filters.yearsMin} onChange={(event) => set("yearsMin", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Years max</span>
            <input className={control} inputMode="numeric" value={filters.yearsMax} onChange={(event) => set("yearsMax", event.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Sort</span>
            <select className={control} value={filters.sort} onChange={(event) => set("sort", event.target.value as TargetFilters["sort"])}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>
        {result.problems.length > 0 ? (
          <p role="alert" className="text-sm">{result.problems.join(" ")}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Showing {result.targets.length} of {targets.length}</p>
        )}
      </section>

      {result.targets.length === 0 ? (
        <p>No targets match these filters.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {result.targets.map((target) => {
            const call = telHref(target.phone)
            return (
              <li key={target.id} className="grid gap-3 py-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] md:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/buy/targets/${target.id}`} className="text-lg font-medium underline-offset-4 hover:underline">
                      {target.name}
                    </Link>
                    {target.sample ? (
                      <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs">Sample data</span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[target.industry || "Industry not set", target.city || "Location not set", target.yearsInBusiness != null ? `${target.yearsInBusiness} years` : ""].filter(Boolean).join(", ")}
                  </p>
                </div>
                <div className="text-sm">
                  <p>Revenue {formatMoney(target.revenue)}</p>
                  <p>Profit {formatMoney(target.profit)}</p>
                  <p className="text-muted-foreground">
                    {target.ownerName || "Owner not set"}
                    {target.ownerAge ? `, age ${target.ownerAge}` : ""}
                    {`, successor ${target.successor}`}
                  </p>
                  <p className="font-mono-anchor text-xs">{target.status}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {call ? (
                    <a className="inline-flex min-h-11 items-center rounded-md border border-foreground px-3 text-sm" href={call}>
                      Call
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center text-sm text-muted-foreground">No phone</span>
                  )}
                  <Link href={`/buy/targets/${target.id}`} className="inline-flex min-h-11 items-center px-3 text-sm underline">
                    Edit
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
