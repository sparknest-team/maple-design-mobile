import { computed, onActivated, onDeactivated, onScopeDispose, ref } from 'vue'

/** Counts overlapping explicit hook calls; never observes notification returns. */
export function usePendingFeedback() {
  const count = ref(0)
  let epoch = 0
  let active = true
  const cancel = () => {
    epoch++
    count.value = 0
  }
  onDeactivated(() => {
    active = false
    cancel()
  })
  onActivated(() => {
    active = true
  })
  onScopeDispose(() => {
    active = false
    cancel()
  })
  function track<T>(invoke: () => T): T {
    const value = invoke()
    if (!value || typeof (value as any).then !== 'function') {
      return value
    }
    const ticket = epoch
    if (active) {
      count.value++
    }
    const counted = active
    return Promise.resolve(value).finally(() => {
      if (counted && active && ticket === epoch) {
        count.value--
      }
    }) as T
  }
  return { pending: computed(() => count.value > 0), track, cancel }
}
