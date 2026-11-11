import { safeAreaEdges, type SafeAreaInsets } from './props'

export function formatSafeAreaInsets(insets?: SafeAreaInsets | null): Record<string, string> {
  const result: Record<string, string> = {}
  for (const edge of safeAreaEdges) {
    const value = insets?.[edge]
    if (value === undefined) {
      continue
    }
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
      throw new TypeError(`SafeArea ${edge} must be a finite non-negative number in CSS pixels`)
    }
    result[`--mp-safe-area-${edge}`] = `${value}px`
  }
  return result
}

/** Replace all four overrides on this DOM host; null restores browser/inherited values. */
export function setSafeAreaInsets(insets: SafeAreaInsets | null, target?: HTMLElement): void {
  const values = formatSafeAreaInsets(insets)
  const host = target ?? (typeof document === 'undefined' ? undefined : document.documentElement)
  if (!host) {
    return
  }
  for (const edge of safeAreaEdges) {
    const name = `--mp-safe-area-${edge}`
    if (values[name] !== undefined) {
      host.style.setProperty(name, values[name])
    } else {
      host.style.removeProperty(name)
    }
  }
}
