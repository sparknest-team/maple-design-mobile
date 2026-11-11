import { computed, onActivated, onBeforeUnmount, onDeactivated, onMounted, onUpdated, ref, watch } from 'vue'
import type { Ref } from 'vue'

/** Match the label to the control, excluding feedback below the control. */
export function useFormContentHeight(element: Ref<HTMLElement | undefined>, enabled: () => boolean) {
  const height = ref<number>()
  let mounted = false
  let active = true
  let observer: ResizeObserver | undefined
  let listening = false

  function measure() {
    if (mounted && active && enabled() && element.value) {
      height.value = element.value.getBoundingClientRect().height
    }
  }
  function disconnect() {
    observer?.disconnect()
    observer = undefined
    if (listening) {
      window.removeEventListener('resize', measure)
      listening = false
    }
    height.value = undefined
  }
  function connect() {
    disconnect()
    if (!mounted || !active || !enabled() || !element.value) {
      return
    }
    measure()
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      observer.observe(element.value)
    } else {
      window.addEventListener('resize', measure)
      listening = true
    }
  }
  watch(() => [enabled(), element.value], connect, { flush: 'post' })
  onMounted(() => {
    mounted = true
    connect()
  })
  onUpdated(measure)
  onDeactivated(() => {
    active = false
    disconnect()
  })
  onActivated(() => {
    active = true
    connect()
  })
  onBeforeUnmount(disconnect)

  return computed(() =>
    enabled() && height.value !== undefined ? { '--mp-form-item-content-height': `${height.value}px` } : undefined,
  )
}
