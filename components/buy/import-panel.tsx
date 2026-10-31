"use client"

import { useState } from "react"
import { CSV_COLUMN_HELP, exportTargetsCsv, importTargetsCsv, sampleTargetsCsv } from "@/lib/buy/csv"
import { downloadText } from "./download"
import { useBuy } from "./provider"

export function ImportPanel() {
  const { targets, importTargets, loadSamples } = useBuy()
  const [errors, setErrors] = useState<{ line: number; message: string }[]>([])
  const [pending, setPending] = useState<ReturnType<typeof importTargetsCsv> | null>(null)
  const [message, setMessage] = useState("")

  async function readFile(file: File | undefined) {
    if (!file) return
    const text = await file.text()
    const result = importTargetsCsv(text)
    setPending(result)
    setErrors(result.errors)
    setMessage("")
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <h2>Import and export</h2>
        <p className="text-sm text-muted-foreground">
          CSV files load targets into this browser only. Call logs stay on this device and are not included in the export. Do not put real owner lists in the repository.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="agency-button" onClick={() => downloadText("buy-targets.csv", exportTargetsCsv(targets))}>
          Export all targets
        </button>
        <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm" onClick={() => downloadText("sample-targets.csv", sampleTargetsCsv())}>
          Download sample CSV
        </button>
        <button type="button" className="min-h-11 px-3 text-sm underline" onClick={loadSamples}>
          Load fictional samples
        </button>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!pending || pending.targets.length === 0) return
          importTargets(pending.targets)
          setMessage(`Added ${pending.targets.length} targets on this device.`)
          setPending(null)
        }}
      >
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">CSV file</span>
          <input
            className="block w-full text-sm"
            type="file"
            accept=".csv,text/csv"
            onChange={(event) => void readFile(event.target.files?.[0])}
          />
        </label>
        {pending ? (
          <p className="text-sm">
            {pending.targets.length} ready to add. {pending.errors.length} skipped.
          </p>
        ) : null}
        {errors.length > 0 ? (
          <ul role="alert" className="list-disc space-y-1 pl-5 text-sm">
            {errors.map((error) => (
              <li key={`${error.line}-${error.message}`}>Line {error.line}: {error.message}</li>
            ))}
          </ul>
        ) : null}
        <button className="agency-button" type="submit" disabled={!pending || pending.targets.length === 0}>
          Add imported targets
        </button>
        {message ? <p role="status" className="text-sm">{message}</p> : null}
      </form>

      <section className="space-y-3">
        <h2>Columns</h2>
        <p className="text-sm text-muted-foreground">
          The first row is the header. A sample file with these columns is in the repository at content/buy/sample-targets.csv.
        </p>
        <ul className="divide-y divide-border border-y border-border">
          {CSV_COLUMN_HELP.map((column) => (
            <li key={column.name} className="grid gap-1 py-3 sm:grid-cols-[16rem_minmax(0,1fr)]">
              <p className="font-mono-anchor text-sm">
                {column.name}
                {column.required ? " (required)" : ""}
              </p>
              <p className="text-sm text-muted-foreground">{column.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
