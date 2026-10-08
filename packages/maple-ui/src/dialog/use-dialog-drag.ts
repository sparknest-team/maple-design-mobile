import { onBeforeUnmount, ref, watch, type Ref } from 'vue'

export interface DialogDragOptions {
  enabled: Ref<boolean>
  fullscreen: Ref<boolean>
}

/** Same-source pointer drag behavior. Bounds remain the responsibility of the local dialog layout. */
export function useDialogDrag(options: DialogDragOptions) {
  const x = ref(0)
  const y = ref(0)
  let removeListeners: (() => void) | undefined

  function reset() {
    x.value = 0
    y.value = 0
  }

  function handlePointerDown(event: PointerEvent) {
    if (!options.enabled.value || options.fullscreen.value || event.button !== 0) {
      return
    }
    event.preventDefault()
    const startX = event.clientX - x.value
    const startY = event.clientY - y.value
    const move = (next: PointerEvent) => {
      x.value = next.clientX - startX
      y.value = next.clientY - startY
    }
    const stop = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
      removeListeners = undefined
    }
    removeListeners?.()
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    removeListeners = stop
  }

  watch(options.fullscreen, reset)
  onBeforeUnmount(() => removeListeners?.())

  return { x, y, reset, handlePointerDown }
}
