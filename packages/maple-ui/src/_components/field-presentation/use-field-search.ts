import { onActivated, onBeforeUnmount, onDeactivated, watch } from 'vue'

/** Search requests belong to one active editor and are consumed before notifying. */
export function useFieldSearch(delay: () => number, available: () => boolean, dispatch: (query: string) => void) {
  let active = true
  let disposed = false
  let generation = 0
  let task: { pending: boolean; id?: ReturnType<typeof setTimeout> } | undefined
  const cancel = () => {
    generation++
    const previous = task
    task = undefined
    if (previous) {
      previous.pending = false
      if (previous.id !== undefined) {
        clearTimeout(previous.id)
      }
    }
  }
  const eligible = () => active && !disposed && available() && active && !disposed
  const search = (query: string) => {
    cancel()
    const request = generation
    if (!eligible() || request !== generation) {
      return
    }
    const ms = delay()
    if (!eligible() || request !== generation) {
      return
    }
    const ticket: NonNullable<typeof task> = { pending: true }
    task = ticket
    ticket.id = setTimeout(() => {
      if (task !== ticket || !ticket.pending) {
        return
      }
      const current = eligible() && request === generation && task === ticket && ticket.pending
      if (!current) {
        return
      }
      ticket.pending = false
      task = undefined
      dispatch(query)
    }, ms)
    if (task !== ticket || !ticket.pending || !active || disposed) {
      clearTimeout(ticket.id)
    }
  }
  watch(
    available,
    (value) => {
      if (!value) {
        cancel()
      }
    },
    { flush: 'sync' },
  )
  onActivated(() => {
    if (!disposed) {
      active = true
    }
  })
  onBeforeUnmount(() => {
    disposed = true
    active = false
    cancel()
  })
  onDeactivated(() => {
    active = false
    cancel()
  })
  return search
}
