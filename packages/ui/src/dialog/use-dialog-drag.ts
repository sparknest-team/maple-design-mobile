import { onActivated, onBeforeUnmount, onDeactivated, ref, watch, type Ref } from 'vue'

export interface DialogDragOptions {
  enabled: Ref<boolean>
  fullscreen: Ref<boolean>
}

/** Same-source pointer drag behavior. Bounds remain the responsibility of the local dialog layout. */
export function useDialogDrag(options: DialogDragOptions) {
  const x = ref(0)
  const y = ref(0)
  let active = true
  let removeListeners: (() => void) | undefined

  function stopGesture() {
    removeListeners?.()
  }
  function reset() {
    stopGesture()
    x.value = 0
    y.value = 0
  }

  function handlePointerDown(event: PointerEvent) {
    if (
      !active ||
      removeListeners ||
      !options.enabled.value ||
      options.fullscreen.value ||
      event.button !== 0 ||
      event.isPrimary === false
    ) {
      return
    }
    const target = (event.currentTarget || event.target) as HTMLElement | null
    const doc = target?.ownerDocument
    if (!target || !doc) {
      return
    }
    const interactive = (event.target as Element | null)?.closest?.(
      'button, a[href], input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"]',
    )
    if (interactive && interactive !== target && target.contains(interactive)) {
      return
    }
    const view = doc.defaultView
    const pointerId = event.pointerId
    const startX = event.clientX - x.value
    const startY = event.clientY - y.value
    const move = (next: PointerEvent) => {
      if (next.pointerId !== pointerId) {
        return
      }
      if (!active || !options.enabled.value || options.fullscreen.value) {
        stop()
        return
      }
      x.value = next.clientX - startX
      y.value = next.clientY - startY
    }
    const end = (next: PointerEvent) => {
      if (next.pointerId === pointerId) {
        stop()
      }
    }
    const stop = () => {
      if (removeListeners !== stop) {
        return
      }
      removeListeners = undefined
      doc.removeEventListener('pointermove', move)
      doc.removeEventListener('pointerup', end)
      doc.removeEventListener('pointercancel', end)
      target.removeEventListener('lostpointercapture', end)
      view?.removeEventListener('blur', stop)
      try {
        if (target.hasPointerCapture?.(pointerId)) {
          target.releasePointerCapture(pointerId)
        }
      } catch {
        // The browser may already have released capture when the pointer was canceled.
      }
    }
    removeListeners = stop
    doc.addEventListener('pointermove', move)
    doc.addEventListener('pointerup', end)
    doc.addEventListener('pointercancel', end)
    target.addEventListener('lostpointercapture', end)
    view?.addEventListener('blur', stop)
    try {
      target.setPointerCapture?.(pointerId)
    } catch {
      // Synthetic pointers and a detached target may not be eligible for capture.
    }
    event.preventDefault()
  }

  watch(
    options.enabled,
    (enabled) => {
      if (!enabled) {
        stopGesture()
      }
    },
    { flush: 'sync' },
  )
  watch(options.fullscreen, reset, { flush: 'sync' })
  onActivated(() => {
    active = true
  })
  onDeactivated(() => {
    active = false
    stopGesture()
  })
  onBeforeUnmount(() => {
    active = false
    stopGesture()
  })

  return { x, y, reset, handlePointerDown }
}
