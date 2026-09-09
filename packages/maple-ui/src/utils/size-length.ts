export function positiveLength(value: unknown, fallback: string): string {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? `${value}px` : fallback
  }
  if (typeof value !== 'string') {
    return fallback
  }
  const text = value.trim()
  if (/^0+(\.0+)?[a-z%]+$/i.test(text)) {
    return fallback
  }
  if (/^\d+(\.\d+)?$/.test(text)) {
    return Number(text) > 0 ? `${text}px` : fallback
  }
  if (!/^(\d+(\.\d+)?(px|rem|em|vw|vh|vmin|vmax|%|ch|ex)|(?:calc|min|max|clamp|var)\(.+\))$/.test(text)) {
    return fallback
  }
  if (typeof CSS !== 'undefined' && CSS.supports && !CSS.supports('width', text)) {
    return fallback
  }
  return text
}
