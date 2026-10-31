import type { CallLog, Outcome, Status, Target } from "./model"

export type QueueBucket = "overdue" | "today" | "new" | "waiting" | "later"

const RANK: Record<QueueBucket, number> = {
  overdue: 0,
  today: 1,
  new: 2,
  waiting: 3,
  later: 4,
}

export function latestCall(target: Target): CallLog | null {
  if (target.calls.length === 0) return null
  return target.calls[target.calls.length - 1] ?? null
}

export function queueBucket(target: Target, today: string): QueueBucket | null {
  if (target.status === "Passed") return null
  const followUp = latestCall(target)?.followUp || ""
  if (followUp && followUp < today) return "overdue"
  if (followUp && followUp === today) return "today"
  if (target.calls.length === 0) return "new"
  if (!followUp) return "waiting"
  return "later"
}

export function bucketLabel(bucket: QueueBucket): string {
  if (bucket === "overdue") return "Overdue"
  if (bucket === "today") return "Due today"
  if (bucket === "new") return "Not called yet"
  if (bucket === "waiting") return "No follow-up date"
  return "Scheduled later"
}

export function isDueToday(target: Target, today: string): boolean {
  const bucket = queueBucket(target, today)
  return bucket === "overdue" || bucket === "today" || bucket === "new"
}

export function compareQueue(left: Target, right: Target, today: string): number {
  const leftBucket = queueBucket(left, today)
  const rightBucket = queueBucket(right, today)
  const leftRank = leftBucket ? RANK[leftBucket] : 9
  const rightRank = rightBucket ? RANK[rightBucket] : 9
  if (leftRank !== rightRank) return leftRank - rightRank
  const leftFollow = latestCall(left)?.followUp || ""
  const rightFollow = latestCall(right)?.followUp || ""
  if ((leftBucket === "overdue" || leftBucket === "today" || leftBucket === "later") && leftFollow !== rightFollow) {
    return leftFollow.localeCompare(rightFollow)
  }
  if (leftBucket === "new") {
    return left.createdAt.localeCompare(right.createdAt) || left.name.localeCompare(right.name)
  }
  const leftDate = latestCall(left)?.date || left.createdAt
  const rightDate = latestCall(right)?.date || right.createdAt
  return leftDate.localeCompare(rightDate) || left.name.localeCompare(right.name)
}

export function callQueue(targets: Target[], today: string, dueOnly: boolean): Target[] {
  return targets
    .filter((target) => {
      const bucket = queueBucket(target, today)
      if (!bucket) return false
      if (!dueOnly) return true
      return isDueToday(target, today)
    })
    .sort((left, right) => compareQueue(left, right, today))
}

export function suggestedStatus(current: Status, outcome: Outcome): Status {
  if (current === "Passed" || current === "NDA" || current === "LOI") {
    if (outcome === "not selling") return "Passed"
    return current
  }
  if (outcome === "interested") return "Interested"
  if (outcome === "not selling") return "Passed"
  if (outcome === "talked") return current === "New" || current === "Contacted" ? "Talking" : current
  if (current === "New") return "Contacted"
  return current
}
