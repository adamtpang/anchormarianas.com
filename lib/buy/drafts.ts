export type DraftKind = "opener" | "voicemail" | "letter"

export type OutreachDraft = {
  kind: DraftKind
  label: string
  text: string
}

type DraftSource = {
  name: string
  ownerName: string
  city: string
}

function owner(target: DraftSource): string {
  return target.ownerName.trim()
}

function place(target: DraftSource): string {
  return target.city.trim() || "the area"
}

export function buildDrafts(target: DraftSource): OutreachDraft[] {
  const business = target.name.trim() || "the firm"
  const person = owner(target)
  const greeting = person ? `Hi, is this ${person}?` : "Hi."
  const opener = [
    greeting,
    "This is Adam with Anchor Marianas.",
    `I am calling about ${business} in ${place(target)}.`,
    "I am looking to buy one small local bookkeeping or tax firm from an owner who may want to retire, and then keep the staff and the clients.",
    "Is this a bad time, or could I ask whether the owner has ever thought about selling?",
  ].join(" ")
  const voicemail = [
    "Hello, this is Adam Pangelinan with Anchor Marianas.",
    `I am calling about ${business}.`,
    "I am a buyer looking at one small bookkeeping or tax firm in this area.",
    person ? `If ${person} would ever consider a sale, I would like a short conversation.` : "If the owner would ever consider a sale, I would like a short conversation.",
    "There is no need to call back if this is not of interest.",
    "Thank you.",
  ].join(" ")
  const letter = [
    person || "Owner",
    business,
    target.city.trim(),
    "",
    `Dear ${person || "Owner"},`,
    "",
    "I am Adam Pangelinan. I am looking to buy one small bookkeeping or tax firm and keep it running, including the people who already work there.",
    `I am writing to ${business} because it is a local practice.`,
    "If you have thought about selling, I would like to talk. If you have not, please set this letter aside.",
    "",
    "Adam Pangelinan",
    "Anchor Marianas",
  ].join("\n")
  return [
    { kind: "opener", label: "Call opener", text: opener },
    { kind: "voicemail", label: "Voicemail", text: voicemail },
    { kind: "letter", label: "Letter", text: letter },
  ]
}
