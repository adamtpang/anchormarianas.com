"use client"

import { useEffect, useState, type FormEvent } from "react"
import { type Outcome, type Target, OUTCOMES, localToday } from "@/lib/buy/model"
import { suggestedStatus } from "@/lib/buy/queue"
import { useBuy } from "./provider"

const control = "w-full border border-input bg-background px-3 py-2 text-base"

export function CallHistory({ target }: { target: Target }) {
  if (target.calls.length === 0) return <p className="text-sm text-muted-foreground">No calls logged.</p>
  const calls = [...target.calls].reverse()
  return (
    <ol className="divide-y divide-border border-y border-border">
      {calls.map((call) => (
        <li key={call.id} className="py-3 text-sm">
          <p className="font-mono-anchor">
            {call.date}, {call.outcome}
          </p>
          {call.notes ? <p className="mt-1">{call.notes}</p> : null}
          {call.followUp ? <p className="mt-1 text-muted-foreground">Follow up {call.followUp}</p> : null}
        </li>
      ))}
    </ol>
  )
}

export function CallLogger({ target }: { target: Target }) {
  const { logCall } = useBuy()
  const [date, setDate] = useState("")
  const [outcome, setOutcome] = useState<Outcome>("no answer")
  const [notes, setNotes] = useState("")
  const [followUp, setFollowUp] = useState("")
  const [spoke, setSpoke] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => setDate(localToday()), [])

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setMessage("Enter the call date.")
      return
    }
    if (followUp && !/^\d{4}-\d{2}-\d{2}$/.test(followUp)) {
      setMessage("Enter the follow-up date as YYYY-MM-DD, or leave it blank.")
      return
    }
    logCall(
      target.id,
      { date, outcome, notes: notes.trim(), followUp, spokeWithOwner: spoke },
      suggestedStatus(target.status, outcome),
    )
    setNotes("")
    setFollowUp("")
    setSpoke(false)
    setMessage("Saved on this device.")
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Date</span>
          <input className={control} type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Outcome</span>
          <select className={control} value={outcome} onChange={(event) => setOutcome(event.target.value as Outcome)}>
            {OUTCOMES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Notes</span>
        <textarea className={`${control} min-h-20`} value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Next follow-up</span>
        <input className={control} type="date" value={followUp} onChange={(event) => setFollowUp(event.target.value)} />
      </label>
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input type="checkbox" checked={spoke} onChange={(event) => setSpoke(event.target.checked)} />
        Spoke with owner
      </label>
      <p className="text-xs text-muted-foreground">
        Saving updates the stage when it is earlier in the pipeline. Not selling moves the target to Passed. Change the stage if that guess is wrong.
      </p>
      <button className="agency-button" type="submit">Save call</button>
      {message ? <p role="status" className="text-sm">{message}</p> : null}
    </form>
  )
}
