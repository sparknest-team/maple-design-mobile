import { computed, shallowRef } from 'vue'

function copy<T>(value: T): T {
  return (Array.isArray(value) ? [...value] : value) as T
}

function same<T>(left: T, right: T) {
  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((value, index) => Object.is(value, right[index]))
  }
  return Object.is(left, right)
}

/** A controlled proposal never becomes local state until the parent accepts it. */
export function useChoiceState<T>(
  model: () => T | undefined,
  initial: T,
  notify: (value: T, event?: Event) => void,
  blocked: () => boolean = () => false,
) {
  const local = shallowRef<T>(copy(initial))
  const value = computed(() => (model() !== undefined ? (model() as T) : local.value))

  function commit(next: T, event?: Event) {
    if (blocked() || same(next, value.value)) {
      return false
    }
    if (model() === undefined) {
      local.value = copy(next)
    }
    notify(copy(next), event)
    return true
  }

  return { value, commit }
}

export function choiceLimit(max?: number | string) {
  if (max === undefined || max === '' || Number.isNaN(Number(max))) {
    return Infinity
  }
  return Math.max(0, Math.floor(Number(max)))
}

export function toggleChoice<T>(values: readonly T[], value: T, checked: boolean, max?: number | string): T[] {
  if (checked) {
    return values.includes(value) || values.length >= choiceLimit(max) ? [...values] : [...values, value]
  }
  return values.filter((item) => !Object.is(item, value))
}

export interface ChoiceCandidate<T> {
  value: T
  disabled?: boolean
  readonly?: boolean
}

/** Bulk operations keep selected locked/unloaded values and only edit known enabled candidates. */
export function bulkChoices<T>(
  values: readonly T[],
  candidates: readonly ChoiceCandidate<T>[],
  inverse: boolean,
  max?: number | string,
): T[] {
  const locked = new Set(candidates.filter((item) => item.disabled || item.readonly).map((item) => item.value))
  const editable = [...new Set(candidates.filter((item) => !locked.has(item.value)).map((item) => item.value))]
  const result = inverse ? values.filter((value) => !editable.includes(value)) : [...values]
  for (const value of editable) {
    const selected = values.includes(value)
    if (!selected && result.length < choiceLimit(max)) {
      result.push(value)
    }
  }
  return result
}
