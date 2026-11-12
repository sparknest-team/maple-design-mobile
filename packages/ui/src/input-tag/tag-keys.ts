/** Stable private identity for each occurrence, including duplicate business values. */
export function createTagKeyResolver() {
  let serial = 0
  let previous: { raw: unknown; value: string | number; key: string }[] = []
  return (rawValues: readonly unknown[], values: readonly { value: string | number }[]) => {
    const used = new Set<number>()
    const exact = new Map<unknown, number[]>()
    const normalized = new Map<string | number, number[]>()
    for (let i = previous.length - 1; i >= 0; i--) {
      const entry = previous[i]
      if (!exact.has(entry.raw)) {
        exact.set(entry.raw, [])
      }
      if (!normalized.has(entry.value)) {
        normalized.set(entry.value, [])
      }
      exact.get(entry.raw)!.push(i)
      normalized.get(entry.value)!.push(i)
    }
    function take<T>(map: Map<T, number[]>, value: T) {
      const candidates = map.get(value)
      while (candidates?.length) {
        const index = candidates.pop()!
        if (!used.has(index)) {
          used.add(index)
          return previous[index].key
        }
      }
      return undefined
    }
    // Reserve exact survivors before matching immutable replacements by typed value.
    const keys = rawValues.map((raw) => take(exact, raw))
    previous = values.map((item, index) => ({
      raw: rawValues[index],
      value: item.value,
      key: keys[index] ?? take(normalized, item.value) ?? `input-tag-entry-${++serial}`,
    }))
    return previous.map((entry) => entry.key)
  }
}
