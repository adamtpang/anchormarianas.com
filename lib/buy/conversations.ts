import type { Target } from "./model"

export const CONVERSATION_GOAL = 10

export function targetSpokeWithOwner(target: Target): boolean {
  return target.spokeWithOwner || target.calls.some((call) => call.spokeWithOwner)
}

export function ownerConversationCount(targets: Target[]): number {
  return targets.filter(targetSpokeWithOwner).length
}
