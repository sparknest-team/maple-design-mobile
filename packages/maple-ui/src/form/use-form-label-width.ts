import {
  computed,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUpdated,
  ref,
  shallowReactive,
  watch,
} from 'vue'
import type { Ref } from 'vue'

export type FormLabelKey = number | symbol

export function useFormLabelWidths() {
  const widths = shallowReactive(new Map<FormLabelKey, number>())
  const maxLabelWidth = computed(() => Math.max(0, ...widths.values()))
  function setLabelWidth(width: number, key?: FormLabelKey) {
    if (key !== undefined && Number.isFinite(width) && width >= 0) {
      widths.set(key, width)
    }
  }
  function removeLabelWidth(key?: FormLabelKey) {
    if (key !== undefined) {
      widths.delete(key)
    }
  }
  return { maxLabelWidth, setLabelWidth, removeLabelWidth }
}

export interface FormLabelRegistry {
  setLabelWidth: (width: number, key?: FormLabelKey) => void
  removeLabelWidth: (key?: FormLabelKey) => void
}

/** Measure only natural label content; column widths never feed back into measurement. */
export function useFormLabelMeasurement(
  element: Ref<HTMLElement | undefined>,
  enabled: () => boolean,
  registry?: FormLabelRegistry,
) {
  const key = Symbol('form-label')
  const mounted = ref(false)
  const active = ref(true)
  let observer: ResizeObserver | undefined
  let listening = false
  function measure() {
    if (mounted.value && active.value && enabled() && element.value) {
      registry?.setLabelWidth(element.value.offsetWidth, key)
    }
  }
  function disconnect() {
    observer?.disconnect()
    observer = undefined
    if (listening) {
      window.removeEventListener('resize', measure)
      listening = false
    }
    registry?.removeLabelWidth(key)
  }
  function connect() {
    disconnect()
    if (!mounted.value || !active.value || !enabled() || !element.value || !registry) {
      return
    }
    measure()
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      observer.observe(element.value)
    } else if (typeof window !== 'undefined') {
      window.addEventListener('resize', measure)
      listening = true
    }
  }
  watch(() => [enabled(), element.value], connect, { flush: 'post' })
  onMounted(() => {
    mounted.value = true
    connect()
  })
  onUpdated(measure)
  onDeactivated(() => {
    active.value = false
    disconnect()
  })
  onActivated(() => {
    active.value = true
    connect()
  })
  onBeforeUnmount(disconnect)
}
