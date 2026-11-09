import { computed, inject, onMounted, ref, watch, type ExtractPropTypes, type ShallowRef } from 'vue'
import { useRangeFieldIndex } from '../../_components/picker-field/range-field-context'
import { formatTimeLabel, getTimePickerChange, getTimePickerState } from '../../time/picker-columns'
import { getTimeWheelPresentationProps } from '../../time/presentation-props'
import { timeExplicitConfirmation } from '../../time/presentation/confirmation-context'
import {
  formatTimeValue,
  fromClockValue,
  getFormattedTimeChoices,
  isFormattedTimeAllowed,
  toClockValue,
  type TimeValue,
} from '../../time/time-value'
import { props as pickerProps } from '../picker-props'
import { isTimeRangeNextDay } from '../picker-utils'

/** Mobile range view: paired wheels share the owner's draft and confirmation. */
export function useMobileRangePanel(
  props: Readonly<ExtractPropTypes<typeof pickerProps>>,
  draft: ShallowRef<TimeValue[] | undefined>,
  select: (value: TimeValue[], immediate?: boolean) => boolean,
  initialize: (value: string[]) => void,
) {
  let initializationComplete = false
  function initializeDraft() {
    if (initializationComplete || props.disabled || props.readonly) {
      return
    }
    const values = draft.value
    if (values != null && (!Array.isArray(values) || values.length > 2)) {
      return
    }
    const empty = (value: TimeValue | undefined) => value == null || value === ''
    if (values?.length === 2 && values.every((value) => !empty(value))) {
      initializationComplete = true
      return
    }
    const next = [0, 1].map((index) =>
      empty(values?.[index])
        ? getFormattedTimeChoices(values?.[index ^ 1], props).value
        : formatTimeValue(values?.[index], props),
    )
    if (next.every((value): value is string => value !== undefined)) {
      initializationComplete = true
      initialize(next)
    }
  }
  onMounted(initializeDraft)
  watch([draft, () => props], initializeDraft, { deep: true, flush: 'post' })
  const confirmationRequired = inject(timeExplicitConfirmation, undefined) ?? ref(false)
  const activeIndex = useRangeFieldIndex()
  const nowValue = () => formatTimeValue(new Date(), props)!
  const nowDisabled = computed(() => props.disabled || props.readonly || !isFormattedTimeAllowed(nowValue(), props))
  function selectNow() {
    if (!props.showNowButton || props.disabled || props.readonly) {
      return false
    }
    const value = nowValue()
    if (!isFormattedTimeAllowed(value, props)) {
      return false
    }
    const next = Array.isArray(draft.value) ? [...draft.value] : []
    next[activeIndex.value] = value
    confirmationRequired.value = true
    return select(next, false)
  }
  function activateWheel(event: Event) {
    const root = event.currentTarget as HTMLElement
    const column = (event.target as HTMLElement).closest('[role="listbox"]')
    const index = Array.from(root.querySelectorAll('[role="listbox"]')).indexOf(column as HTMLElement)
    if (index >= 0) {
      activeIndex.value = index >= pickerSplit.value ? 1 : 0
    }
  }
  function defaultTime() {
    return fromClockValue('00:00:00', props)!
  }

  const startValue = computed(() => {
    const value = draft.value
    return Array.isArray(value) && value[0] != null ? formatTimeLabel(value[0], props) : defaultTime()
  })

  const endValue = computed(() => {
    const value = draft.value
    return Array.isArray(value) && value[1] != null ? formatTimeLabel(value[1], props) : defaultTime()
  })

  const reversed = computed(() => {
    const value = draft.value
    return Boolean(
      Array.isArray(value) &&
      value.length === 2 &&
      isTimeRangeNextDay(toClockValue(value[0], props), toClockValue(value[1], props)),
    )
  })
  const showNextDayLabel = computed(() => props.showNextDay && reversed.value)
  const orderInvalid = computed(() => !props.showNextDay && reversed.value)

  const pickerBindingProps = computed(() => getTimeWheelPresentationProps(props.pickerProps))

  const pickerStates = computed(() => [
    getTimePickerState(startValue.value, props),
    getTimePickerState(endValue.value, props),
  ])
  const pickerColumns = computed(() => pickerStates.value.flatMap((state) => state.columns))
  const pickerValue = computed(() => pickerStates.value.flatMap((state) => state.value))
  const pickerSplit = computed(() => pickerStates.value[0].columns.length)

  function handlePickerChange(values: (string | number)[]) {
    if (props.disabled || props.readonly) {
      return
    }
    const split = pickerSplit.value
    if (values.slice(split).some((value, index) => value !== pickerValue.value[split + index])) {
      activeIndex.value = 1
    } else if (values.slice(0, split).some((value, index) => value !== pickerValue.value[index])) {
      activeIndex.value = 0
    }
    const start = getTimePickerChange(values.slice(0, pickerSplit.value), props, startValue.value)
    const end = getTimePickerChange(values.slice(pickerSplit.value), props, endValue.value)
    if (start !== undefined && end !== undefined) {
      select([start, end], props.disableConfirm && !confirmationRequired.value)
    }
  }

  return {
    confirmationRequired,
    activeIndex,
    nowDisabled,
    selectNow,
    activateWheel,
    startValue,
    endValue,
    showNextDayLabel,
    orderInvalid,
    pickerBindingProps,
    pickerColumns,
    pickerSplit,
    pickerValue,
    handlePickerChange,
  }
}
