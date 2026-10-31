export function parseAgeRange(value: string): { min: number; max: number } | null {
  const text = value.trim().replace(/[\u2013\u2014]/g, "-").replace(/\s+/g, "")
  if (!text) return null
  const plus = /^(\d{1,3})\+$/.exec(text)
  if (plus) {
    const min = Number(plus[1])
    if (min > 120) return null
    return { min, max: 120 }
  }
  const range = /^(\d{1,3})-(\d{1,3})$/.exec(text)
  if (range) {
    const left = Number(range[1])
    const right = Number(range[2])
    if (left > 120 || right > 120) return null
    return { min: Math.min(left, right), max: Math.max(left, right) }
  }
  const single = /^(\d{1,3})$/.exec(text)
  if (!single) return null
  const age = Number(single[1])
  if (age > 120) return null
  return { min: age, max: age }
}
