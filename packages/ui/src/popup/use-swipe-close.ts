import { onBeforeUnmount, ref, watch, type Ref } from 'vue'

/** A bottom sheet can be dragged only from its explicitly marked header. */
export function useSwipeClose(options: {
  enabled: () => boolean
  threshold: () => number
  element: Ref<HTMLElement | undefined>
  close: (event: PointerEvent) => void
}) {
  const offset = ref(0)
  const dragging = ref(false)
  let pointer: number | undefined
  let startX = 0
  let startY = 0
  let lastY = 0
  let downward = false
  let scaleX = 1
  let scaleY = 1
  function reset() {
    const id = pointer
    pointer = undefined
    offset.value = 0
    dragging.value = false
    if (id !== undefined && options.element.value?.hasPointerCapture?.(id)) {
      options.element.value.releasePointerCapture(id)
    }
  }
  function pointerdown(event: PointerEvent) {
    const root = options.element.value
    const target = event.target as Element | null
    if (!root || !options.enabled() || pointer !== undefined || event.isPrimary === false || event.button !== 0) {
      return
    }
    const handle = target?.closest?.('[data-popup-swipe-handle]')
    if (
      !handle ||
      !root.contains(handle) ||
      target?.closest('[data-modal-focus-root]') !== root ||
      target?.closest('button, a, input, textarea, select, [contenteditable="true"], [role="button"]')
    ) {
      return
    }
    pointer = event.pointerId
    startX = event.clientX
    startY = lastY = event.clientY
    const rect = root.getBoundingClientRect()
    const ratioX = root.offsetWidth ? rect.width / root.offsetWidth : 1
    const ratioY = root.offsetHeight ? rect.height / root.offsetHeight : 1
    scaleX = Number.isFinite(ratioX) && ratioX > 0 ? ratioX : 1
    scaleY = Number.isFinite(ratioY) && ratioY > 0 ? ratioY : 1
    downward = false
    dragging.value = true
    root.setPointerCapture?.(pointer)
  }
  function pointermove(event: PointerEvent) {
    if (event.pointerId !== pointer || !options.enabled()) {
      return
    }
    const dx = Math.abs(event.clientX - startX) / scaleX
    const dy = (event.clientY - startY) / scaleY
    if (dx > Math.abs(dy) && dx > 8) {
      reset()
      return
    }
    if (event.clientY !== lastY) {
      downward = event.clientY > lastY
    }
    lastY = event.clientY
    offset.value = Math.max(0, dy)
    if (offset.value) {
      event.preventDefault()
    }
  }
  function pointerup(event: PointerEvent) {
    if (event.pointerId !== pointer) {
      return
    }
    const threshold = options.threshold()
    const dismiss =
      options.enabled() && downward && offset.value >= (Number.isFinite(threshold) && threshold > 0 ? threshold : 40)
    reset()
    if (dismiss) {
      options.close(event)
    }
  }
  function pointercancel(event: PointerEvent) {
    if (event.pointerId === pointer) {
      reset()
    }
  }
  watch(
    options.enabled,
    (enabled) => {
      if (!enabled) {
        reset()
      }
    },
    { flush: 'sync' },
  )
  onBeforeUnmount(reset)
  return {
    offset,
    dragging,
    handlers: { pointerdown, pointermove, pointerup, pointercancel, lostpointercapture: pointercancel },
  }
}
