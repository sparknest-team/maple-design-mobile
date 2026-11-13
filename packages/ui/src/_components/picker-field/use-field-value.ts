import { computed, shallowRef, watch, type ComputedRef } from 'vue'
import type { CompatibleShallowRef as ShallowRef } from '../../_utils/compatible-shallow-ref'

export function cloneFieldValue<T>(value: T): T {
  if (value instanceof Date) {
    return new Date(value.getTime()) as T
  }
  if (Array.isArray(value)) {
    return value.map((item) => cloneFieldValue(item)) as T
  }
  return value
}

/** Defaults initialize once; external replacements are authoritative and never emit. */
export function useFieldValue<T>(options: {
  value: () => T | undefined
  defaultValue?: () => T | undefined
  controlled?: () => boolean
}): {
  value: ComputedRef<T | undefined>
  localValue: ShallowRef<T | undefined>
  setValue: (value: T | undefined) => void
} {
  const localValue: ShallowRef<T | undefined> = shallowRef<T | undefined>(cloneFieldValue(options.defaultValue?.()))
  watch(
    options.value,
    (next) => {
      localValue.value = cloneFieldValue(next)
    },
    { flush: 'sync' },
  )
  const value = computed(() =>
    (options.controlled?.() ?? options.value() !== undefined) ? options.value() : localValue.value,
  )
  function setValue(next: T | undefined) {
    localValue.value = cloneFieldValue(next)
  }
  return { value, localValue, setValue }
}
