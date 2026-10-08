import { computed, type ExtractPropTypes, type ShallowRef } from 'vue'
import { useRangeFieldIndex } from '../../_components/picker-field/range-field-context'
import { formatTimeLabel, getTimePickerChange, getTimePickerState } from '../../time/picker-columns'
import { getTimePanelPresentationProps, getTimeWheelPresentationProps } from '../../time/presentation-props'
import {
  fromClockValue,
  getFormattedTimeChoices as getTimeChoices,
  toClockValue,
  type TimeValue,
} from '../../time/time-value'
import { props as pickerProps } from '../picker-props'
import { isTimeRangeNextDay } from '../picker-utils'

/** Mobile-only range view: active endpoint and wheel/clock inputs. */
export function useMobileRangePanel(
  props: Readonly<ExtractPropTypes<typeof pickerProps>>,
  draft: ShallowRef<TimeValue[] | undefined>,
  select: (value: TimeValue[]) => boolean,
) {
  const activeIndex = useRangeFieldIndex()
  const activeTab = computed({
    get: () => (activeIndex.value === 1 ? 'end' : 'start'),
    set: (side: 'start' | 'end') => {
      activeIndex.value = side === 'end' ? 1 : 0
    },
  })

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

  const showNextDayLabel = computed(
    () =>
      props.showNextDay &&
      isTimeRangeNextDay(toClockValue(startValue.value, props), toClockValue(endValue.value, props)),
  )

  const timePickerBindingProps = computed(() => getTimePanelPresentationProps(props.timePickerProps))
  const pickerBindingProps = computed(() => getTimeWheelPresentationProps(props.pickerProps))

  const pickerState = computed(() =>
    getTimePickerState(activeTab.value === 'start' ? startValue.value : endValue.value, props),
  )
  const pickerColumns = computed(() => pickerState.value.columns)
  const pickerValue = computed(() => pickerState.value.value)

  function emitValue(next: string[]) {
    select(next)
  }

  function updateSide(side: 'start' | 'end', time: string) {
    if (props.disabled || props.readonly) {
      return
    }
    if (!toClockValue(time, props)) {
      return
    }
    const selected = getTimeChoices(time, props).value
    if (!selected) {
      return
    }
    const next = [startValue.value, endValue.value]
    next[side === 'start' ? 0 : 1] = selected
    emitValue(next)
  }

  function handlePickerChange(values: (string | number)[]) {
    if (props.disabled || props.readonly) {
      return
    }
    const value = getTimePickerChange(values, props)
    if (value !== undefined) {
      updateSide(activeTab.value, value)
    }
  }

  return {
    activeTab,
    startValue,
    endValue,
    showNextDayLabel,
    formatLabel: (value: string) => formatTimeLabel(value, props),
    timePickerBindingProps,
    pickerBindingProps,
    pickerColumns,
    pickerValue,
    updateSide,
    handlePickerChange,
  }
}
