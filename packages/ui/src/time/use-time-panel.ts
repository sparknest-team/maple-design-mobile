import { computed, shallowRef, watch, type ShallowRef } from 'vue'
import { cloneFieldValue, useFieldValue } from '../_components/picker-field/use-field-value'
import { getTimeCommitValue } from './time-commit'
import { getTimeEventDates } from './time-events'
import { formatTimeValue, isFormattedTimeAllowed, type FormattedTimeRules, type TimeValue } from './time-value'

export type TimePanelValue = TimeValue | Array<TimeValue | undefined>
export type TimePanelOutput<T> = T extends unknown[] ? Array<string | undefined> : string

export interface TimePanelOptions<T extends TimePanelValue> extends FormattedTimeRules {
  modelValue?: T
  defaultValue?: T
  disabled?: boolean
  readonly?: boolean
  disableConfirm?: boolean
  showNextDay?: boolean
}

/** Per-instance state; renderers convert their local selection into public time values. */
export function useTimePanel<T extends TimePanelValue>(
  options: TimePanelOptions<T>,
  events: {
    select: (value: TimePanelOutput<T>, dates: ReturnType<typeof getTimeEventDates>) => void
    change: (value: TimePanelOutput<T>, dates: ReturnType<typeof getTimeEventDates>) => void
    confirm?: (value: TimePanelOutput<T>, dates: ReturnType<typeof getTimeEventDates>) => void
  },
  range: () => boolean = () => false,
) {
  const model = useFieldValue<T>({ value: () => options.modelValue, defaultValue: () => options.defaultValue })
  const draft = shallowRef(cloneFieldValue(model.value.value)) as ShallowRef<T | undefined>
  watch(
    model.value,
    (value) => {
      draft.value = cloneFieldValue(value)
    },
    { deep: true, flush: 'sync' },
  )
  const blocked = computed(() => Boolean(options.disabled || options.readonly))
  const parts = (value: T | undefined) => (Array.isArray(value) ? value : [value])
  const commitValue = computed(() => getTimeCommitValue(draft.value, options, range()))
  const canConfirm = computed(() => !blocked.value && commitValue.value !== undefined)

  function format(value: T | undefined): TimePanelOutput<T> {
    return (
      Array.isArray(value)
        ? Array.from(value, (part) => formatTimeValue(part, options))
        : formatTimeValue(value, options)
    ) as TimePanelOutput<T>
  }

  /** Returns success even for an unchanged value, so the popup owner can close. */
  function confirm() {
    if (!canConfirm.value) {
      return false
    }
    const output = commitValue.value as TimePanelOutput<T>
    if (JSON.stringify(output) !== JSON.stringify(format(model.value.value))) {
      model.setValue(output as T)
      events.change(output, getTimeEventDates(output, options))
    }
    events.confirm?.(output, getTimeEventDates(output, options))
    return true
  }

  /** Stage a renderer's visible initial candidate without selecting or committing. */
  function initialize(value: T) {
    if (blocked.value || getTimeCommitValue(value, options, range()) === undefined) {
      return false
    }
    draft.value = cloneFieldValue(value)
    return true
  }

  function select(value: T, immediate = options.disableConfirm) {
    if (blocked.value || Array.isArray(value) !== range()) {
      return false
    }
    // A range may be incomplete while editing, but existing endpoints must be valid.
    const selected = parts(value).filter((part) => part !== undefined)
    if (!selected.length || !selected.every((part) => isFormattedTimeAllowed(part, options))) {
      return false
    }
    draft.value = cloneFieldValue(value)
    const output = format(value)
    events.select(output, getTimeEventDates(output, options))
    if (immediate) {
      confirm()
    }
    return true
  }

  return { draft, blocked, canConfirm, initialize, select, confirm }
}
