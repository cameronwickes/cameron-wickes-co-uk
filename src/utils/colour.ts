/**
 * Shared utility functions used across components.
 */

/** Convert a hex colour string to an "r,g,b" string for use in rgba(). */
export const hexToRgb = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

/** Calculate perceived luminance of a hex colour (0–1 scale). */
export const bgLuminance = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 / 255
}

/** Returns true if the background colour is perceptually light. */
export const isLightBg = (hex: string): boolean => bgLuminance(hex) > 0.5
