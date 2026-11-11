import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import type { Breakpoint, ResponsiveValue } from '../types'

const points: [Breakpoint, number][] = [
  ['xxl', 1600],
  ['xl', 1200],
  ['lg', 992],
  ['md', 768],
  ['sm', 576],
]
// xs is the deterministic SSR/hydration baseline. Subscribe even for an initial
// scalar so switching to a responsive object after mount works immediately.
export function useResponsiveState(value: Ref<number | ResponsiveValue>, fallback: number, _fallbackToXs = true) {
  const matches = ref<Partial<Record<Breakpoint, boolean>>>({})
  const cleanup: (() => void)[] = []
  const clear = () => cleanup.splice(0).forEach((stop) => stop())
  onMounted(() => {
    watch(
      () => typeof value.value === 'object',
      (active) => {
        clear()
        if (!active) {
          return
        }
        if (typeof window.matchMedia !== 'function') {
          return
        }
        for (const [point, width] of points) {
          const query = window.matchMedia(`(min-width: ${width}px)`)
          const update = () => {
            matches.value = { ...matches.value, [point]: query.matches }
          }
          update()
          if (query.addEventListener) {
            query.addEventListener('change', update)
            cleanup.push(() => query.removeEventListener('change', update))
          } else {
            query.addListener(update)
            cleanup.push(() => query.removeListener(update))
          }
        }
      },
      { immediate: true },
    )
  })
  onBeforeUnmount(clear)
  return computed(() => {
    if (typeof value.value === 'number') {
      return value.value
    }
    for (const [point] of points) {
      if (matches.value[point] && value.value[point] !== undefined) {
        return value.value[point]!
      }
    }
    return value.value.xs ?? fallback
  })
}
