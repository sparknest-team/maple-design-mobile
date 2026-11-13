import { ref, shallowRef, watch, type Ref } from 'vue'
import type { CompatibleShallowRef as ShallowRef } from '../../_utils/compatible-shallow-ref'

export interface FieldTransaction<T> {
  draft: ShallowRef<T>
  commit: (value?: T) => boolean
  cancel: () => void
  clear: (value: T) => boolean
  reset: () => void
}

/** All fields own committed values; panels only edit isolated drafts. */
export function useFieldTransaction<T>(options: {
  value: () => T
  open: Ref<boolean | undefined>
  initialize?: (value: T) => T
  clone: (value: T) => T
  blocked: () => boolean
  valid?: (value: T) => boolean
  onCommit: (value: T) => void
  onCancel?: () => void
  onClose?: (value: T) => void
}): FieldTransaction<T> {
  const draft = shallowRef<T>(options.clone(options.value()))
  const settled = ref(false)
  const result = shallowRef<T>(options.clone(options.value()))
  function reset() {
    const value = options.clone(options.value())
    draft.value = options.initialize ? options.initialize(value) : value
    result.value = value
    settled.value = false
  }
  watch(
    options.open,
    (open, previous) => {
      if (open) {
        reset()
      } else if (previous) {
        if (!settled.value) {
          options.onCancel?.()
        }
        options.onClose?.(options.clone(settled.value ? result.value : options.value()))
        draft.value = options.clone(options.value())
        settled.value = false
      }
    },
    { immediate: true, flush: 'sync' },
  )
  watch(
    options.value,
    () => {
      // An external value replacement is authoritative, even while a panel is open.
      draft.value = options.clone(options.value())
    },
    { deep: true },
  )
  function commit(value: T = draft.value) {
    if (options.blocked() || settled.value || options.valid?.(value) === false) {
      return false
    }
    const next = options.clone(value)
    result.value = next
    settled.value = true
    options.onCommit(next)
    options.open.value = false
    if (!options.open.value) {
      settled.value = false
    }
    return true
  }
  function cancel() {
    options.open.value = false
  }
  function clear(value: T) {
    if (options.blocked()) {
      return false
    }
    draft.value = options.clone(value)
    return commit(value)
  }
  return { draft, commit, cancel, clear, reset }
}
