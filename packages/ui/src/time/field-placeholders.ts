/** Resolve endpoint labels without mutating caller-owned arrays or losing explicit empty text. */
export function resolveTimeFieldPlaceholders(
  value: string | string[] | undefined,
  fallback: string | string[],
  range: boolean,
): string[] {
  const text = value ?? fallback
  const count = range ? 2 : 1
  return Array.from({ length: count }, (_, index) => (Array.isArray(text) ? (text[index] ?? '') : text))
}
