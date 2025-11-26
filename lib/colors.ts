/**
 * AnchorMarianas Color Palette
 * Ocean-themed professional design system
 *
 * Inspired by the Mariana Trench - deep blues with clean whites
 */

export const colors = {
  // Primary - Deep Ocean Navy
  primary: {
    50: "#e6f0ff",
    100: "#cce0ff",
    200: "#99c2ff",
    300: "#66a3ff",
    400: "#3385ff",
    500: "#0066ff", // Main primary
    600: "#0052cc",
    700: "#003d99",
    800: "#002966",
    900: "#001a33", // Darkest navy (header)
    950: "#000d1a"
  },

  // Secondary - Ocean Blue
  secondary: {
    50: "#e6f2ff",
    100: "#cce5ff",
    200: "#99cbff",
    300: "#66b0ff",
    400: "#3396ff",
    500: "#007bff", // Main secondary
    600: "#0062cc",
    700: "#004a99",
    800: "#003166",
    900: "#002147", // Mid ocean
    950: "#001733"
  },

  // Accent - Bright Blue (for CTAs and highlights)
  accent: {
    50: "#e6f7ff",
    100: "#ccefff",
    200: "#99dfff",
    300: "#66cfff",
    400: "#33bfff",
    500: "#00afff", // Main accent - Bright blue
    600: "#008ccc",
    700: "#006999",
    800: "#004666",
    900: "#002333",
    950: "#001119"
  },

  // Neutral - Clean whites and grays
  neutral: {
    50: "#ffffff",  // Pure white backgrounds
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
    950: "#000000"
  },

  // Semantic colors
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6"
} as const

/**
 * Color usage guide:
 *
 * - primary.900: Navigation bar background
 * - primary.500: Links, buttons (primary)
 * - secondary.900: Ocean footer gradient start
 * - accent.500: CTAs, hover states, active links
 * - neutral.50: Page backgrounds
 * - neutral.900: Body text
 */

export type ColorScale = typeof colors.primary
export type ColorName = keyof typeof colors
export type ColorShade = keyof ColorScale
