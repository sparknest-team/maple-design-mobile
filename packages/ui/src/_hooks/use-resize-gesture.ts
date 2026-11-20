import { onActivated, onBeforeUnmount, onDeactivated } from 'vue'

/** Own pointer/mouse listeners for one resize transaction, including cancellation. */
export function useResizeGesture(options: {
  element: () => HTMLElement | undefined
  cursor: () => string
  start: (event: MouseEvent) => boolean | void
  move: (dx: number, dy: number, event: MouseEvent) => void
  end?: (event: MouseEvent) => void
  cancel?: (event: MouseEvent) => void
}) {
  let available = true
  let transaction: { event: MouseEvent; pointerId?: number; win: Window; body: HTMLElement; cursor: string; ownCursor: string } | undefined
  function detach() {
    const old = transaction
    transaction = undefined
    if (!old) return
    for (const type of ['mousemove', 'pointermove']) old.win.removeEventListener(type, move as EventListener)
    for (const type of ['mouseup', 'pointerup', 'pointercancel', 'contextmenu', 'blur']) old.win.removeEventListener(type, end as EventListener)
    if (old.body.style.cursor === old.ownCursor) old.body.style.cursor = old.cursor
  }
  function cancel() {
    const current = transaction
    detach()
    if (current) options.cancel?.(current.event)
  }
  function matches(event: Event) {
    return transaction && (!event.type.startsWith('pointer') || (event as PointerEvent).pointerId === transaction.pointerId)
  }
  function move(event: MouseEvent) {
    const current = transaction
    if (!current || !available || !matches(event)) return
    // A pointer transaction ignores compatibility mouse events.
    if (current.pointerId !== undefined && !event.type.startsWith('pointer')) return
    options.move(event.clientX - current.event.clientX, event.clientY - current.event.clientY, event)
  }
  function end(event: Event) {
    const current = transaction
    if (!current || !matches(event)) return
    if (current.pointerId !== undefined && event.type === 'mouseup') return
    detach()
    if (available) options.end?.(event instanceof MouseEvent ? event : current.event)
  }
  function begin(event: MouseEvent) {
    if (!available || transaction || event.button !== 0 || ('isPrimary' in event && event.isPrimary === false)) return false
    const element = options.element(), win = element?.ownerDocument.defaultView
    if (!element || !win) return false
    event.preventDefault()
    const current = { event, pointerId: event.type === 'pointerdown' ? (event as PointerEvent).pointerId : undefined, win, body: element.ownerDocument.body, cursor: element.ownerDocument.body.style.cursor, ownCursor: options.cursor() }
    transaction = current
    if (options.start(event) === false || transaction !== current || !available) { if (transaction === current) detach(); return false }
    current.body.style.cursor = current.ownCursor
    win.addEventListener(current.pointerId === undefined ? 'mousemove' : 'pointermove', move as EventListener)
    for (const type of ['mouseup', 'pointerup', 'pointercancel', 'contextmenu', 'blur']) win.addEventListener(type, end as EventListener)
    return true
  }
  onDeactivated(() => { available = false; cancel() })
  onActivated(() => { available = true })
  onBeforeUnmount(() => { available = false; cancel() })
  return { begin, cancel, active: () => !!transaction }
}
