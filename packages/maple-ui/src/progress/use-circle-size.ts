import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { toPxNum } from '../utils/elements'

export function useCircleSize(
  element: Ref<HTMLElement | undefined>,
  length: () => string,
  stroke: () => number | string | undefined,
) {
  const measured = ref(0)
  const mounted = ref(false)
  let observer: ResizeObserver | undefined
  const fallback = computed(() => (/^\d+(\.\d+)?px$/.test(length()) ? parseFloat(length()) : 64))
  const diameter = computed(() => Math.max(1, measured.value || fallback.value))
  const strokeWidth = computed(() => {
    const value = stroke()
    const px =
      value == null ? 4 : typeof value === 'number' ? value : mounted.value ? toPxNum(value) : parseFloat(value)
    return Math.min(diameter.value * 0.99, Number.isFinite(px) && px > 0 ? px : 4)
  })
  const measure = () => {
    const width = element.value?.getBoundingClientRect().width
    measured.value = width && width > 0 ? width : 0
  }
  const observe = () => {
    observer?.disconnect()
    if (!mounted.value) {
      return
    }
    measure()
    if (typeof ResizeObserver !== 'undefined' && element.value) {
      observer = new ResizeObserver(measure)
      observer.observe(element.value)
    }
  }
  onMounted(() => {
    mounted.value = true
    observe()
  })
  watch(element, observe, { flush: 'post' })
  watch(length, measure, { flush: 'post' })
  onBeforeUnmount(() => observer?.disconnect())
  return { diameter, strokeWidth }
}
