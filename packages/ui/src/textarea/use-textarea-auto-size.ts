import {
  computed,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onScopeDispose,
  ref,
  watch,
  type CSSProperties,
  type Ref,
} from 'vue'
import type { TextareaAutoSize } from './props'
import { getSizeStyles, getTextareaAutoSizeStyle } from './utils'

/** Independent local copy; DOM observers are active only while mounted/activated. */
export function useTextareaAutoSize(
  textarea: Ref<HTMLTextAreaElement | undefined>,
  mirror: Ref<HTMLElement | undefined>,
  value: Ref<string>,
  options: () => boolean | TextareaAutoSize,
) {
  const mirrorStyle = ref<CSSProperties>()
  const autoSizeStyle = ref<CSSProperties>()
  let observer: ResizeObserver | undefined
  let active = false
  let generation = 0

  async function sync() {
    const run = ++generation
    if (!active) {
      return
    }
    if (!options()) {
      autoSizeStyle.value = undefined
      return
    }
    if (!textarea.value || !mirror.value || typeof window === 'undefined') {
      return
    }
    const styles = getSizeStyles(window.getComputedStyle(textarea.value))
    mirrorStyle.value = styles
    await nextTick()
    if (!active || run !== generation || !options()) {
      return
    }
    const config = options()
    autoSizeStyle.value = getTextareaAutoSizeStyle(
      styles,
      mirror.value?.offsetHeight ?? 0,
      typeof config === 'object' ? config : undefined,
    )
  }
  function stop() {
    active = false
    generation++
    observer?.disconnect()
    observer = undefined
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', sync)
    }
  }
  function start() {
    if (active || typeof window === 'undefined') {
      return
    }
    active = true
    window.addEventListener('resize', sync)
    if (typeof ResizeObserver !== 'undefined' && textarea.value) {
      observer = new ResizeObserver(() => {
        void sync()
      })
      observer.observe(textarea.value)
    }
    void sync()
  }
  watch(
    [value, computed(options)],
    () => {
      void nextTick(sync)
    },
    { deep: true },
  )
  onMounted(start)
  onActivated(start)
  onDeactivated(stop)
  onScopeDispose(stop)
  return { mirrorStyle, autoSizeStyle, sync }
}
