"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { buildRoiReport } from "@/lib/roi/calculate"
import { BANT, SURVEY, validateAnswers, type Answers } from "@/lib/roi/survey"

const ALL = [...SURVEY, ...BANT]

const money = (v: number) =>
  `$${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`

export function SurveyForm() {
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)

  const answeredCount = ALL.filter((q) => typeof answers[q.id] === "number").length
  const issues = useMemo(
    () => validateAnswers(answers).filter((i) => i.reason === "out-of-range"),
    [answers]
  )
  const report = useMemo(() => buildRoiReport(answers), [answers])

  const set = (id: string, raw: string) => {
    setAnswers((prev) => {
      const next = { ...prev }
      if (raw.trim() === "") delete next[id]
      else {
        const n = Number(raw)
        if (Number.isFinite(n)) next[id] = n
      }
      return next
    })
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
        className="flex flex-col gap-8"
      >
        {ALL.map((q) => {
          const bad = issues.find((i) => i.id === q.id)
          return (
            <div key={q.id} className="flex flex-col gap-2">
              <label htmlFor={q.id} className="t-body font-semibold text-foreground">
                {q.prompt}
              </label>
              <p className="t-small text-muted-foreground">{q.why}</p>
              <Input
                id={q.id}
                type="number"
                inputMode="decimal"
                min={q.min}
                max={q.max}
                placeholder="Your number"
                value={answers[q.id] ?? ""}
                onChange={(e) => set(q.id, e.target.value)}
                aria-invalid={bad ? true : undefined}
                aria-describedby={bad ? `${q.id}-error` : undefined}
                className="max-w-[14rem]"
              />
              {bad && (
                <p id={`${q.id}-error`} className="t-small text-destructive">
                  That looks outside the usual range ({q.min} to {q.max}). We will not
                  change it for you, so please check it.
                </p>
              )}
            </div>
          )
        })}

        <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
          <Button type="submit" size="lg" className="rounded-full">
            See what it is costing you
          </Button>
          <p className="t-small text-muted-foreground">
            {answeredCount} of {ALL.length} answered. Nothing is sent anywhere.
          </p>
        </div>
      </form>

      <aside
        aria-live="polite"
        className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24"
      >
        <p className="t-eyebrow">Your numbers</p>

        {answeredCount === 0 && (
          <p className="t-small mt-4 text-muted-foreground">
            Answer a question and the arithmetic appears here. Every figure is
            built only from what you type, never from an industry average.
          </p>
        )}

        {answeredCount > 0 && report.recommended.length === 0 && (
          <p className="t-small mt-4 text-muted-foreground">
            Not enough answered yet to calculate anything honestly.
          </p>
        )}

        {report.recommended.map((f) => (
          <div key={f.slug} className="mt-6 border-t border-border pt-5 first:mt-4 first:border-0 first:pt-0">
            <p className="t-body font-semibold text-foreground">{f.service}</p>
            <p className="t-small mt-1 text-muted-foreground">
              {money(f.monthlyRecurring)}/mo
              {f.monthlySetup ? ` + ${money(f.monthlySetup)} setup` : ""}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {f.costOfProblem.map((c) => (
                <li key={c.label} className="t-small text-muted-foreground">
                  <span className="text-foreground">{c.label}:</span> {c.formula}
                </li>
              ))}
            </ul>
            {f.breakEven && (
              <p className="t-small mt-3 text-accent">
                Has to beat: {f.breakEven.formula}
              </p>
            )}
          </div>
        ))}

        {report.outOfBudget.map((f) => (
          <p key={f.slug} className="t-small mt-4 text-muted-foreground">
            {f.service} is {money(f.monthlyRecurring)}/mo, above the budget you
            gave. Not proposed.
          </p>
        ))}

        {report.notApplicable.map((f) => (
          <p key={f.slug} className="t-small mt-4 text-muted-foreground">
            {f.service}: {f.notApplicableReason}
          </p>
        ))}

        {submitted && report.recommended.length > 0 && (
          <div className="mt-6 border-t border-border pt-5">
            <p className="t-small text-muted-foreground">
              If these numbers look right, the next step is a 15-minute call to
              scope the smallest version. If they look wrong, say so and we will
              correct them.
            </p>
            <Button asChild className="mt-4 w-full rounded-full">
              <a href="https://cal.com/adamtpang">Book 15 minutes</a>
            </Button>
          </div>
        )}

        <p className="t-small mt-6 border-t border-border pt-4 text-muted-foreground">
          Anchor has not measured how much any service improves these numbers.
          That is why this shows what each one has to beat, not what it will
          deliver.
        </p>
      </aside>
    </div>
  )
}
