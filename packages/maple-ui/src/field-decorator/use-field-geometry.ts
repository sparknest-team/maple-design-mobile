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
  let frameGeneration = 0
  let measurementGeneration = 0

  const measure = (cycle = generation) => {
    const rootElement = root.value
    const middleElement = middle.value
    const measurement = ++measurementGeneration
    const current = () =>
      mounted &&
      cycle === generation &&
      measurement === measurementGeneration &&
      root.value === rootElement &&
      middle.value === middleElement
    if (!current() || !rootElement || !middleElement) {
      return
    }
    const rootWidth = rootElement.clientWidth
    if (!current() || !rootWidth) {
      return
    }
    const left = middleElement.offsetLeft
    if (!current()) {
      return
    }
    const contentWidth = middleElement.offsetWidth
    if (!current()) {
      return
    }
    const nextOffset = isRtl.value ? rootWidth - left - contentWidth : left
    if (!current()) {
      return
    }
    offset.value = nextOffset
    if (current()) {
      width.value = contentWidth
    }
  }
  const schedule = () => {
    if (!mounted || frame !== undefined) {
      return
    }
    const cycle = generation
    if (typeof requestAnimationFrame === 'function') {
      const ticket = ++frameGeneration
      let consumed = false
      frame = requestAnimationFrame(() => {
        if (consumed || cycle !== generation || ticket !== frameGeneration || !mounted) {
          return
        }
        consumed = true
        frame = undefined
        measure(cycle)
      })
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
    if (!mounted || cycle !== generation) {
      return
    }
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
    frameGeneration++
    measurementGeneration++
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
