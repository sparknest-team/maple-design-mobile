import { computed, onBeforeUnmount, onMounted, onUpdated, ref, type Ref } from 'vue'

/** Observe the content column, including a hidden popup becoming visible. */
export function useFieldGeometry(root: Ref<HTMLElement | undefined>, middle: Ref<HTMLElement | undefined>) {
  const left = ref<number>()
  const width = ref<number>()
  let observer: ResizeObserver | undefined
  let frame: number | undefined
  let mounted = false

  const measure = () => {
    frame = undefined
    if (!mounted || !root.value || !middle.value || !root.value.clientWidth) {
      return
    }
    left.value = middle.value.offsetLeft
    width.value = middle.value.offsetWidth
  }
  const schedule = () => {
    if (!mounted || frame !== undefined) {
      return
    }
    if (typeof requestAnimationFrame === 'function') {
      frame = requestAnimationFrame(measure)
    } else {
      measure()
    }
  }

  onMounted(() => {
    mounted = true
    measure()
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(schedule)
      if (root.value) {
        observer.observe(root.value)
      }
      if (middle.value) {
        observer.observe(middle.value)
      }
    }
    window.addEventListener('resize', schedule)
  })
  onUpdated(schedule)
  onBeforeUnmount(() => {
    mounted = false
    observer?.disconnect()
    window.removeEventListener('resize', schedule)
    if (frame !== undefined) {
      cancelAnimationFrame(frame)
    }
  })

  return computed(() => ({
    '--mp-internal-field-content-offset': left.value === undefined ? undefined : `${left.value}px`,
    '--mp-internal-field-content-width': width.value === undefined ? undefined : `${width.value}px`,
  }))
}
