"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { type Status, STATUSES, isStatus, localToday, telHref } from "@/lib/buy/model"
import { bucketLabel, callQueue, queueBucket } from "@/lib/buy/queue"
import { CallHistory, CallLogger } from "./call-log"
import { useBuy } from "./provider"

const control = "w-full border border-input bg-background px-3 py-2 text-base"

export function CallQueue() {
  const { targets, setStatus } = useBuy()
  const [today, setToday] = useState("")
  const [dueOnly, setDueOnly] = useState(true)
  useEffect(() => setToday(localToday()), [])

  if (!today) return <p>Loading the desk saved on this device.</p>

  const queue = callQueue(targets, today, dueOnly)

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="space-y-3">
        <h2>Who to call next</h2>
        <p className="text-sm text-muted-foreground">
          Overdue follow-ups come first, then follow-ups due today, then owners you have not called. Tap a number to call. This desk does not place the call.
        </p>
        <fieldset className="flex flex-wrap gap-2 border-0 p-0">
          <legend className="sr-only">Queue view</legend>
          <button
            type="button"
            aria-pressed={dueOnly}
            className={`min-h-11 rounded-md border px-3 text-sm ${dueOnly ? "border-foreground bg-foreground text-background" : "border-border"}`}
            onClick={() => setDueOnly(true)}
          >
            Due today
          </button>
          <button
            type="button"
            aria-pressed={!dueOnly}
            className={`min-h-11 rounded-md border px-3 text-sm ${dueOnly ? "border-border" : "border-foreground bg-foreground text-background"}`}
            onClick={() => setDueOnly(false)}
          >
            All open
          </button>
        </fieldset>
      </div>

      {queue.length === 0 ? (
        <p>No one is due today. Switch to all open targets, or add a follow-up date.</p>
      ) : (
        <ol className="divide-y divide-border border-y border-border">
          {queue.map((target, index) => {
            const bucket = queueBucket(target, today)
            const call = telHref(target.phone)
            return (
              <li key={target.id} className="space-y-3 py-5">
                <p className="font-mono-anchor text-xs text-muted-foreground">
                  {index === 0 ? "Up next" : `Next ${index + 1}`}
                  {bucket ? `, ${bucketLabel(bucket)}` : ""}
                </p>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-xl">
                    <Link href={`/buy/targets/${target.id}`} className="underline-offset-4 hover:underline">
                      {target.name}
                    </Link>
                  </h3>
                  {target.sample ? (
                    <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs">Sample data</span>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  {target.ownerName || "Owner not set"}
                  {target.ownerAge ? `, age ${target.ownerAge}` : ""}
                  {`, successor ${target.successor}`}
                  {target.city ? `. ${target.city}` : ""}
                </p>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">Stage</span>
                  <select
                    className={control}
                    value={target.status}
                    onChange={(event) => {
                      if (isStatus(event.target.value)) setStatus(target.id, event.target.value as Status)
                    }}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>
                {call ? (
                  <a className="agency-button w-full" href={call} aria-label={`Call ${target.name} at ${target.phone}`}>
                    Call {target.phone}
                  </a>
                ) : (
                  <p className="text-sm">No phone number yet.</p>
                )}
                <details>
                  <summary className="min-h-11 cursor-pointer text-sm underline">Log this call</summary>
                  <div className="space-y-4 pt-3">
                    <CallLogger target={target} />
                    <CallHistory target={target} />
                  </div>
                </details>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
