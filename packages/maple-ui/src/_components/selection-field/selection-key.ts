import { toRaw } from 'vue'

/** Stable identity for scalar values and cascader paths; labels are never keys. */
export function createSelectionKey() {
  const objects = new WeakMap<object, number>()
  let next = 0
  function key(value: unknown): string {
    if (Array.isArray(value)) {
      return JSON.stringify(value.map(key))
    }
    if (value !== null && typeof value === 'object') {
      const raw = toRaw(value)
      if (!objects.has(raw)) {
        objects.set(raw, next++)
      }
      return 'object:' + objects.get(raw)
    }
    return typeof value + ':' + String(value)
  }
  return key
}
