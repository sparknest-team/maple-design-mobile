import { computed, onBeforeUnmount, onDeactivated, ref, shallowRef, watch, type ComputedRef, type Ref } from 'vue'
import type { CompatibleShallowRef as ShallowRef } from '../../_utils/compatible-shallow-ref'

export function sameSelectionValue(left: unknown, right: unknown): boolean {
  return (
    Object.is(left, right) ||
    (Array.isArray(left) &&
      Array.isArray(right) &&
      left.length === right.length &&
      left.every((value, index) => Object.is(value, right[index])))
  )
}

export interface SelectionSession<T> {
  value: ComputedRef<T>
  draft: ShallowRef<T>
  pending: Ref<boolean>
  error: Ref<string>
  update: (value: T) => void
  commit: (event?: Event) => boolean | Promise<boolean>
  cancel: () => void
  reset: () => void
}
export function useSelectionSession<T>(options: {
  value: () => T
  open: Ref<boolean>
  deferred: () => boolean
  blocked: () => boolean
  valid?: (value: T) => boolean
  same?: (left: T, right: T) => boolean
  clone: (value: T) => T
  publish: (value: T, event?: Event) => void
  close: () => void
  beforeCommit?: (value: T, signal: AbortSignal) => void | boolean | Promise<void | boolean>
  cancelOnExternalChange?: boolean
}): SelectionSession<T> {
  const draft = shallowRef<T>(options.clone(options.value()))
  const settled = ref(false)
  const pending = ref(false)
  const error = ref('')
  let epoch = 0
  let publishing = false
  let abort: AbortController | undefined
  const reset = () => {
    epoch++
    abort?.abort()
    pending.value = false
    error.value = ''
    draft.value = options.clone(options.value())
    settled.value = false
  }
  watch(options.open, reset, { flush: 'sync' })
  watch(
    options.value,
    () => {
      if (publishing) {
        return
      }
      if (options.cancelOnExternalChange && options.open.value && options.deferred()) {
        options.close()
      }
      reset()
    },
    { deep: true, flush: 'sync' },
  )
  onBeforeUnmount(reset)
  onDeactivated(() => {
    options.close()
    reset()
  })
  const value = computed(() => (options.open.value && options.deferred() ? draft.value : options.value()))
  function update(next: T) {
    if (options.blocked() || settled.value || pending.value) {
      return
    }
    error.value = ''
    if (options.open.value && options.deferred()) {
      draft.value = options.clone(next)
    } else {
      options.publish(options.clone(next))
    }
  }
  function commit(event?: Event) {
    if (
      options.blocked() ||
      settled.value ||
      pending.value ||
      !options.open.value ||
      options.valid?.(draft.value) === false
    ) {
      return false
    }
    error.value = ''
    const next = options.clone(draft.value)
    const run = ++epoch
    const finish = (allowed?: void | boolean) => {
      if (run !== epoch || allowed === false || options.blocked() || !options.open.value) {
        return false
      }
      settled.value = true
      publishing = true
      try {
        if (!(options.same ?? sameSelectionValue)(next, options.value())) {
          if (event) {
            options.publish(next, event)
          } else {
            options.publish(next)
          }
        }
      } finally {
        publishing = false
      }
      settled.value = true
      options.close()
      return true
    }
    if (!options.beforeCommit) {
      return finish()
    }
    abort?.abort()
    abort = new AbortController()
    pending.value = true
    const signal = abort.signal
    let stopWaiting!: () => void
    const cancelled = new Promise<false>((resolve) => {
      stopWaiting = () => resolve(false)
      signal.addEventListener('abort', stopWaiting, { once: true })
    })
    const work = Promise.resolve().then(() => (run === epoch ? options.beforeCommit?.(next, signal) : false))
    return Promise.race([work, cancelled])
      .then(finish)
      .catch((cause) => {
        if (run === epoch) {
          error.value = cause instanceof Error ? cause.message : String(cause)
        }
        return false
      })
      .finally(() => {
        signal.removeEventListener('abort', stopWaiting)
        if (run === epoch) {
          pending.value = false
        }
      })
  }
  function cancel() {
    if (pending.value) {
      return
    }
    reset()
    settled.value = true
    options.close()
  }
  return { value, draft, pending, error, update, commit, cancel, reset }
}
