import { computed, onActivated, onBeforeUnmount, onDeactivated, onMounted, onUpdated, ref, watch, type Ref } from 'vue'
import { useDirection } from '../_utils/direction'

/** Observe the content column, including a hidden popup becoming visible. */
export function useFieldGeometry(root: Ref<HTMLElement | undefined>, middle: Ref<HTMLElement | undefined>) {
  const { dir, isRtl } = useDirection(() => root.value)
  const offset = ref<number>()
  const width = ref<number>()
  let observer: ResizeObserver | undefined
  let observedRoot: HTMLElement | undefined
  let observedMiddle: HTMLElement | undefined
  let frame: number | undefined
  let mounted = false
  let generation = 0

  const measure = (cycle = generation) => {
    if (cycle !== generation) {
      return
    }
    frame = undefined
    if (!mounted || !root.value || !middle.value || !root.value.clientWidth) {
      return
    }
    offset.value = isRtl.value
      ? root.value.clientWidth - middle.value.offsetLeft - middle.value.offsetWidth
      : middle.value.offsetLeft
    width.value = middle.value.offsetWidth
  }
  const schedule = () => {
    if (!mounted || frame !== undefined) {
      return
    }
    const cycle = generation
    if (typeof requestAnimationFrame === 'function') {
      frame = requestAnimationFrame(() => measure(cycle))
    } else {
      measure(cycle)
    }
  }

  const observeTargets = () => {
    if (observedRoot === root.value && observedMiddle === middle.value) {
      return
    }
    if (observedRoot || observedMiddle) {
      observer?.disconnect()
    }
    observedRoot = root.value
    observedMiddle = middle.value
    if (root.value) {
      observer?.observe(root.value)
    }
    if (middle.value) {
      observer?.observe(middle.value)
    }
  }
  watch(
    [root, middle],
    () => {
      if (!mounted) {
        return
      }
      observeTargets()
      schedule()
    },
    { flush: 'post' },
  )
  const start = () => {
    if (mounted) {
      return
    }
    mounted = true
    const cycle = ++generation
    measure(cycle)
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        if (mounted && cycle === generation) {
          schedule()
        }
      })
      observeTargets()
    }
    window.addEventListener('resize', schedule)
  }
  onMounted(start)
  onActivated(start)
  watch(dir, schedule, { flush: 'post' })
  onUpdated(schedule)
  const stop = () => {
    mounted = false
    generation++
    observer?.disconnect()
    observer = undefined
    observedRoot = undefined
    observedMiddle = undefined
    window.removeEventListener('resize', schedule)
    if (frame !== undefined) {
      cancelAnimationFrame(frame)
      frame = undefined
    }
  }
  onDeactivated(stop)
  onBeforeUnmount(stop)

  return computed(() => ({
    '--mp-internal-field-hint-origin': isRtl.value ? 'right center' : undefined,
    '--mp-internal-field-content-offset': offset.value === undefined ? undefined : `${offset.value}px`,
    '--mp-internal-field-content-width': width.value === undefined ? undefined : `${width.value}px`,
  }))
}
