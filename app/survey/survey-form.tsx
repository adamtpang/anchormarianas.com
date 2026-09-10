"use client"

import { useEffect, useRef, useState } from "react"
import {
	ArrowLeft,
	ArrowRight,
	Copy,
	Download,
	Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import site from "@/content/site.json"
import {
	emptyIntake,
	intakeEstimate,
	intakeSummary,
	parseDraft,
	questionsFor,
	workflows,
	type Intake,
	type Workflow,
} from "@/lib/roi/intake"
import { validateAnswers } from "@/lib/roi/survey"

const DRAFT_KEY = "anchor-business-brief-v1"

export function SurveyForm() {
	const [intake, setIntake] = useState<Intake>(emptyIntake)
	const [step, setStep] = useState(0)
	const [message, setMessage] = useState("")
	const [hasDraft, setHasDraft] = useState(false)
	const heading = useRef<HTMLHeadingElement>(null)
	const previousStep = useRef(0)
	const estimate = intakeEstimate(intake)
	const questions = questionsFor(intake.workflow)
	const errors = validateAnswers(intake.answers, questions).filter(
		(x) => x.reason !== "missing",
	)
	const summary = intakeSummary(intake)

	useEffect(() => {
		try {
			setHasDraft(Boolean(localStorage.getItem(DRAFT_KEY)))
		} catch {
			/* Saving is optional. */
		}
	}, [])
	useEffect(() => {
		if (previousStep.current !== step) heading.current?.focus()
		previousStep.current = step
	}, [step])

	function go(next: number) {
		setStep(next)
		setMessage("")
	}
	function update(
		key: "business" | "website" | "problem" | "timing",
		value: string,
	) {
		setIntake((previous) => ({ ...previous, [key]: value }))
	}
	function save() {
		try {
			localStorage.setItem(DRAFT_KEY, JSON.stringify({ version: 1, intake }))
			setHasDraft(true)
			setMessage("Saved on this browser only. Nothing has been sent to Anchor.")
		} catch {
			setMessage(
				"This browser could not save the draft. Keep this tab open, or download your summary on the last step.",
			)
		}
	}
	function restore() {
		try {
			const restored = parseDraft(localStorage.getItem(DRAFT_KEY) || "")
			if (!restored) throw new Error("Invalid draft")
			setIntake(restored)
			go(0)
			setMessage("Saved draft loaded. Review the answers before sharing.")
		} catch {
			setMessage(
				"The saved draft could not be read. Your current answers are still here.",
			)
		}
	}
	function removeSaved() {
		try {
			localStorage.removeItem(DRAFT_KEY)
			setHasDraft(false)
			setMessage(
				"Saved copy removed from this browser. Your open form is unchanged.",
			)
		} catch {
			setMessage(
				"The saved copy could not be removed. Use your browser's site-data settings to remove it.",
			)
		}
	}
	async function copy() {
		try {
			await navigator.clipboard.writeText(summary)
			setMessage(
				"Summary copied. Paste it into your message to Adam when you are ready.",
			)
		} catch {
			setMessage(
				"Copy is unavailable. Select the summary below and copy manually, or download it.",
			)
		}
	}
	function download() {
		const url = URL.createObjectURL(
			new Blob([summary], { type: "text/plain;charset=utf-8" }),
		)
		const link = document.createElement("a")
		link.href = url
		link.download = "anchor-business-brief.txt"
		link.click()
		window.setTimeout(() => URL.revokeObjectURL(url), 1000)
		setMessage(
			"Download requested. Check your downloads, then share the file if you want a review.",
		)
	}

	return (
		<div className="brief-layout ph-no-capture">
			<div className="min-w-0">
				<form
					className="brief-panel"
                    onInvalid={(event) => { const details = (event.target as HTMLElement).closest("details"); if (details) details.open = true }}
					onSubmit={(event) => {
						event.preventDefault()
						if (step === 1 && errors.length) {
							document.getElementById(errors[0].id)?.focus()
							setMessage("Check the highlighted number before continuing.")
							return
						}
						go(2)
					}}
				>
					<div className={step === 0 ? "sr-only" : "brief-panel-heading"}>

						<h2 className="t-h2 mt-3" ref={heading} tabIndex={-1}>
							{
								[
									"Project details",
									"Add numbers (optional).",
									"Review",
								][step]
							}
						</h2>
						<p className="brief-help mt-3">
							{
								[
									"",
									"Leave unknowns blank. Estimates are not promised savings.",
									"Nothing has been sent to Anchor.",
								][step]
							}
						</p>
					</div>

					{step === 0 && (
						<div className="brief-fields">
							<div>
								<label className="brief-label" htmlFor="business">
									Business
								</label>
								<Input
									id="business"
									autoComplete="organization"
									required
									maxLength={120}
									value={intake.business}
									onChange={(e) => update("business", e.target.value)}

								/>
							</div>
							<div>
								<label className="brief-label" htmlFor="problem">
									What do you need?
								</label>
								<Textarea
									id="problem"
									required
									minLength={20}
									maxLength={1500}
									rows={3}
									value={intake.problem}
									onChange={(e) => update("problem", e.target.value)}
									placeholder="A website, an app, a better way to…"
									aria-describedby="problem-hint"
								/>
								<p className="brief-help mt-2" id="problem-hint">
									20 characters minimum.
								</p>
							</div>
                            <details className="brief-optional">
                              <summary>More details</summary>
                              <div className="brief-fields mt-5">
							<div>
								<label className="brief-label" htmlFor="website">
									Website <span>(optional)</span>
								</label>
								<Input
									id="website"
									type="url"
									autoComplete="url"
									maxLength={300}
									value={intake.website}
									onChange={(e) => update("website", e.target.value)}
									placeholder="https://yourbusiness.com"
								/>
							</div>
							<fieldset>
								<legend className="brief-label">
									Main focus
								</legend>
								<div className="brief-choices">
									{Object.entries(workflows).map(([key, item]) => (
										<label
											key={key}
											className={`brief-choice ${intake.workflow === key ? "is-selected" : ""}`}
										>
											<input
												type="radio"
												name="workflow"
												value={key}
												checked={intake.workflow === key}
												onChange={() =>
													setIntake((p) => ({
														...p,
														workflow: key as Workflow,
													}))
												}
											/>
											<span>{item.label}</span>
										</label>
									))}
								</div>
							</fieldset>
							<div>
								<label className="brief-label" htmlFor="timing">
									Timing
								</label>
								<select
									id="timing"
									className="brief-select"
									value={intake.timing}
									onChange={(e) => update("timing", e.target.value)}
								>
									<option>Exploring</option>
									<option>Within a month</option>
									<option>Within three months</option>
									<option>There is a specific deadline</option>
								</select>
							</div>                                <Button type="button" variant="outline" onClick={(event) => { if (event.currentTarget.closest("form")?.reportValidity()) go(1) }}>Add numbers</Button>
                              </div>
                            </details>
						</div>
					)}

					{step === 1 && (
						<div className="brief-fields">
							{questions.map((q) => {
								const issue = errors.find((e) => e.id === q.id)
								return (
									<div key={q.id}>
										<label className="brief-label" htmlFor={q.id}>
											{q.prompt} <span>(optional)</span>
										</label>
										<p id={`${q.id}-hint`} className="brief-help mb-3">
											{q.why}
										</p>
										<div className="brief-number">
											<Input
												id={q.id}
												type="number"
												inputMode="decimal"
												step="any"
												min={q.min}
												max={q.max}
												value={intake.answers[q.id] ?? ""}
												placeholder="Unknown"
												aria-invalid={Boolean(issue)}
												aria-describedby={`${q.id}-hint${issue ? ` ${q.id}-error` : ""}`}
												onChange={(e) => {
													const raw = e.target.value
													setIntake((previous) => {
														const answers = { ...previous.answers }
														if (raw === "") delete answers[q.id]
														else answers[q.id] = Number(raw)
														return { ...previous, answers }
													})
												}}
											/>
											<span>{q.unit.replace(/-/g, " ")}</span>
										</div>
										{issue && (
											<p id={`${q.id}-error`} className="brief-error mt-2">
												Enter a number from {q.min} to {q.max}, or leave this
												blank.
											</p>
										)}
									</div>
								)
							})}
						</div>
					)}

					{step === 2 && (
						<div className="brief-fields">
							<div>
								<label className="brief-label" htmlFor="summary">
									Your business brief
								</label>
								<Textarea
									id="summary"
									className="brief-summary"
									readOnly
									rows={16}
									value={summary}
								/>
							</div>
							<div className="flex flex-wrap gap-3">
								<Button type="button" onClick={copy}>
									<Copy size={16} aria-hidden className="mr-2" />
									Copy brief
								</Button>
								<Button type="button" variant="outline" onClick={download}>
									<Download size={16} aria-hidden className="mr-2" />
									Download
								</Button>
							</div>
							<a
								className="brief-text-link"
								href={`mailto:${site.email}?subject=${encodeURIComponent(`Business brief: ${intake.business}`)}&body=${encodeURIComponent(summary)}`}
							>
								Open email draft
							</a>
							<div className="border-t border-border pt-6">
								<a
									className="brief-text-link mt-3"
									href={site.discoveryCal}
									target="_blank"
									rel="noopener noreferrer"
								>
									Optional: book a free call{" "}
									<span className="sr-only">(opens a new tab)</span>
									<ArrowRight size={16} aria-hidden />
								</a>
							</div>
						</div>
					)}

					<div className="brief-actions">
						{step > 0 && (
							<Button
								type="button"
								variant="ghost"
								onClick={() => go(0)}
							>
								<ArrowLeft size={16} aria-hidden className="mr-2" />
								Back
							</Button>
						)}
						{step < 2 && (
							<Button type="submit" className="ml-auto">
								Review
								<ArrowRight size={16} aria-hidden className="ml-2" />
							</Button>
						)}
					</div>
				</form>
				<details className="brief-draft"><summary>Save for later</summary><div className="brief-save">
					<Button type="button" variant="ghost" onClick={save}>
						<Save size={16} aria-hidden className="mr-2" />
						Save draft locally
					</Button>
					{hasDraft && (
						<>
							<Button type="button" variant="ghost" onClick={restore}>
								Load saved draft
							</Button>
							<Button type="button" variant="ghost" onClick={removeSaved}>
								Delete saved copy
							</Button>
						</>
					)}
					<p className="brief-help w-full">
						Saved only in this browser. Use a trusted device.
					</p>
				</div></details>
				<p role="status" className="brief-status">
					{message}
				</p>
			</div>

            {step > 0 && estimate && (
              <aside className="brief-aside" aria-label="Your estimate">
                <div className="brief-estimate" aria-live="polite" aria-atomic="true">
                  <h2>{estimate.label}</h2>
                  <div className="brief-amount">${estimate.value.toLocaleString("en-US", { maximumFractionDigits: 2 })}</div>
                  <span className="brief-help">{estimate.unit}</span>
                  <p className="brief-help mt-4">{estimate.formula}</p>
                  <p className="brief-help mt-3">{estimate.limitation}</p>
                </div>
              </aside>
            )}
		</div>
	)
}
