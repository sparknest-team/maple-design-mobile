import { computed, ref, shallowRef, watch, type ComputedRef, type Ref, type ShallowRef } from 'vue'

export interface SelectionSession<T> {
  value: ComputedRef<T>
  draft: ShallowRef<T>
  update: (value: T) => void
  commit: () => void
  cancel: () => void
  reset: () => void
}

/** A local editing session. Presentations never own or publish the selected value. */
export function useSelectionSession<T>(options: {
  value: () => T
  open: Ref<boolean>
  deferred: () => boolean
  blocked: () => boolean
  valid?: (value: T) => boolean
  clone: (value: T) => T
  publish: (value: T) => void
  close: () => void
}): SelectionSession<T> {
  const draft = shallowRef<T>(options.clone(options.value()))
  const settled = ref(false)
  const reset = () => {
    draft.value = options.clone(options.value())
    settled.value = false
  }
  watch(options.open, reset, { flush: 'sync' })
  watch(options.value, reset, { deep: true, flush: 'sync' })
  const value = computed(() => (options.open.value && options.deferred() ? draft.value : options.value()))
  function update(next: T) {
    if (options.blocked() || settled.value) {
      return
    }
    if (options.open.value && options.deferred()) {
      draft.value = options.clone(next)
    } else {
      options.publish(options.clone(next))
    }
  }
  function commit() {
    if (options.blocked() || settled.value || !options.open.value || options.valid?.(draft.value) === false) {
      return
    }
    const next = options.clone(draft.value)
    settled.value = true
    options.publish(next)
    // A controlled parent may leave the popup open. Do not publish twice.
    settled.value = true
    options.close()
  }
  function cancel() {
    draft.value = options.clone(options.value())
    settled.value = true
    options.close()
  }
  return { value, draft, update, commit, cancel, reset }
}
