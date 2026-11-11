import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

export function useCompact(
  root: Ref<HTMLElement | undefined>,
  props: { responsive: boolean; compactBreakpoint: number },
) {
  const width = ref<number>()
  let observer: ResizeObserver | undefined
  const measure = () => {
    if (root.value) {
      width.value = root.value.getBoundingClientRect().width
    }
  }
  onMounted(() => {
    measure()
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      if (root.value) {
        observer.observe(root.value)
      }
    } else {
      window.addEventListener('resize', measure)
    }
  })
  onBeforeUnmount(() => {
    observer?.disconnect()
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', measure)
    }
  })
  return computed(
    () => props.responsive && width.value !== undefined && width.value > 0 && width.value <= props.compactBreakpoint,
  )
}
