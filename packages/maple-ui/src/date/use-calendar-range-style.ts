import { ref, watch } from 'vue'
import dayjs from 'dayjs'

export function useCalendarRangeStyle(options: {
  endpoints: () => string[]
  pending: () => boolean
  enabled: () => boolean
  readonly: () => boolean
  version: () => unknown
  unit: 'day' | 'month' | 'year'
  name: (part: string) => string
}) {
  const hovered = ref<string>()
  const clearPreview = () => {
    hovered.value = undefined
  }
  watch(() => [options.endpoints(), options.pending(), options.readonly(), options.version()], clearPreview)
  function rangeState(value: string) {
    const previewing = options.pending() && hovered.value !== undefined
    const endpoints = options.endpoints().filter(Boolean)
    const bounds = (previewing ? [endpoints[0], hovered.value] : endpoints)
      .filter(Boolean)
      .map((part) => dayjs(part).startOf(options.unit).valueOf())
      .filter(Number.isFinite)
      .sort((a, b) => a - b)
    const current = dayjs(value).startOf(options.unit).valueOf()
    const inside =
      options.enabled() && bounds.length > 0 && current >= bounds[0] && current <= bounds[bounds.length - 1]
    return {
      inside,
      start: inside && current === bounds[0],
      end: inside && current === bounds[bounds.length - 1],
      previewing,
    }
  }
  function rangeClasses(value: string) {
    const state = rangeState(value)
    return {
      [options.name('range')]: state.inside,
      [options.name('range--start')]: state.start,
      [options.name('range--end')]: state.end,
      [options.name('range--preview')]: state.inside && state.previewing,
    }
  }
  function preview(value: string, event: PointerEvent, disabled: boolean) {
    clearPreview()
    if (event.pointerType === 'mouse' && options.enabled() && options.pending() && !options.readonly() && !disabled) {
      hovered.value = value
    }
  }
  return { rangeState, rangeClasses, preview, clearPreview }
}
