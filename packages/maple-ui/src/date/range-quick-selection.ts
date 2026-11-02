import { computed, inject, provide, ref, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import dayjs from 'dayjs/esm/index.js'
import { outputDateValue, parseDateValue, type DateSelection } from './date-value'
import type { DatePanelOptions } from './panel-state'
import type { DateShortcut } from './panel-tools-props'
import type { useDateSelection } from './use-date-selection'

/** Evaluate relative ranges at selection time, rather than when the panel first opened. */
export function currentRangeShortcuts(options: DatePanelOptions, now = new Date()): DateShortcut[] {
  const end = dayjs(now).millisecond(0)
  const range = (start: dayjs.Dayjs) => [
    outputDateValue(start.toDate(), options),
    outputDateValue(end.toDate(), options),
  ]
  return [
    { label: '今天', value: range(end.startOf('day')) },
    { label: '最近24小时', value: range(end.subtract(24, 'hour')) },
    {
      label: '本周',
      value: range(end.subtract((end.day() - (options.dayStartOfWeek ?? 0) + 7) % 7, 'day').startOf('day')),
    },
    { label: '最近7天', value: range(end.subtract(7, 'day')) },
    { label: '最近15分钟', value: range(end.subtract(15, 'minute')) },
    { label: '最近30天', value: range(end.subtract(30, 'day')) },
    { label: '最近30分钟', value: range(end.subtract(30, 'minute')) },
    { label: '最近90天', value: range(end.subtract(90, 'day')) },
    { label: '最近1小时', value: range(end.subtract(1, 'hour')) },
    { label: '最近1年', value: range(end.subtract(1, 'year')) },
  ]
}
export const rangeQuickConfirmRequired: InjectionKey<Ref<boolean>> = Symbol('range-quick-confirm-required')

export interface RangeQuickSelection {
  pending: Ref<boolean>
  enabled: ComputedRef<boolean>
  open: Ref<boolean>
  items: ComputedRef<DateShortcut[]>
  disabled: (item: DateShortcut) => boolean
  choose: (index: number) => void
  toggle: () => void
}
const quickSelectionKey: InjectionKey<RangeQuickSelection> = Symbol('date-range-quick-selection')
export const useRangeQuickPanel = () => inject(quickSelectionKey, undefined)

export function useRangeQuickSelection(
  options: ComputedRef<DatePanelOptions>,
  range: ComputedRef<boolean>,
  blocked: ComputedRef<boolean>,
  selection: ReturnType<typeof useDateSelection>,
  endPreview: () => void,
  onShortcut: (item: DateShortcut) => void,
) {
  const enabled = computed(() => range.value && !options.value.range && Boolean(options.value.showTime))
  const open = ref(false)
  const pending = inject(rangeQuickConfirmRequired, undefined) ?? ref(false)
  const items = computed(() =>
    options.value.shortcuts?.length ? options.value.shortcuts : currentRangeShortcuts(options.value),
  )
  function value(item: DateShortcut): DateSelection {
    try {
      const source = typeof item.value === 'function' ? item.value() : item.value
      const convert = (part: Exclude<DateSelection, unknown[]>) => {
        const parsed = parseDateValue(part, { ...options.value, ...(item.format ? { valueFormat: item.format } : {}) })
        return parsed ? outputDateValue(parsed.toDate(), options.value) : undefined
      }
      return Array.isArray(source) ? source.map(convert) : convert(source)
    } catch {
      return undefined
    }
  }
  const disabled = (item: DateShortcut) => Boolean(blocked.value || item.disabled || !selection.valid(value(item)))
  function choose(index: number) {
    const item = options.value.shortcuts?.length
      ? options.value.shortcuts[index]
      : currentRangeShortcuts(options.value)[index]
    if (!item || blocked.value || item.disabled) {
      return
    }
    const candidate = value(item)
    if (!selection.valid(candidate)) {
      return
    }
    endPreview()
    pending.value = true
    if (!selection.select(candidate, false)) {
      return
    }
    onShortcut(item)
  }
  const context = {
    pending,
    enabled,
    open,
    items,
    disabled,
    choose,
    toggle: () => {
      if (!blocked.value) {
        open.value = !open.value
      }
    },
  }
  provide(quickSelectionKey, context)
  return context
}
