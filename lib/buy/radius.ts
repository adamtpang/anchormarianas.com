// Primary ZIP codes for the cities named in the buy platform spec:
// New Braunfels, Canyon Lake, Schertz, Seguin, Boerne, San Marcos, Bulverde, and Kyle.

export const NEW_BRAUNFELS_ZIPS = [
  "78130",
  "78131",
  "78132",
  "78133",
  "78154",
  "78155",
  "78006",
  "78015",
  "78666",
  "78667",
  "78163",
  "78640",
] as const

export const ZIP_CITY: Record<(typeof NEW_BRAUNFELS_ZIPS)[number], string> = {
  "78130": "New Braunfels",
  "78131": "New Braunfels",
  "78132": "New Braunfels",
  "78133": "Canyon Lake",
  "78154": "Schertz",
  "78155": "Seguin",
  "78006": "Boerne",
  "78015": "Boerne",
  "78666": "San Marcos",
  "78667": "San Marcos",
  "78163": "Bulverde",
  "78640": "Kyle",
}

export function zip5(value: string): string {
  const digits = value.replace(/\D/g, "")
  return digits.slice(0, 5)
}

export function isInRadius(value: string, zips: readonly string[] = NEW_BRAUNFELS_ZIPS): boolean {
  const zip = zip5(value)
  return zip.length === 5 && zips.includes(zip)
}
