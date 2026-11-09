import { computed, inject, onMounted, ref, watch, type ExtractPropTypes, type ShallowRef } from 'vue'
import { getTimePickerChange, getTimePickerState } from '../picker-columns'
import { props as pickerProps } from '../picker-props'
import { getTimeWheelPresentationProps } from '../presentation-props'
import { resolveTimeFormat } from '../time-format'
import { formatTimeValue, getFormattedTimeChoices, isFormattedTimeAllowed, type TimeValue } from '../time-value'
import { timeExplicitConfirmation } from './confirmation-context'

/** Wheel rendering uses the panel owner's draft and selection transaction. */
export function useMobileTimePanel(
  props: Readonly<ExtractPropTypes<typeof pickerProps>>,
  draft: ShallowRef<TimeValue | undefined>,
  select: (value: TimeValue, immediate?: boolean) => boolean,
  initialize: (value: string) => void,
) {
  let initializationComplete = false
  function initializeDraft() {
    if (initializationComplete || props.disabled || props.readonly) {
      return
    }
    if (draft.value != null && draft.value !== '') {
      initializationComplete = true
      return
    }
    const value = getFormattedTimeChoices(undefined, props).value
    if (value !== undefined) {
      initializationComplete = true
      initialize(value)
    }
  }
  onMounted(initializeDraft)
  watch([draft, () => props], initializeDraft, { deep: true, flush: 'post' })
  const confirmationRequired = inject(timeExplicitConfirmation, undefined) ?? ref(false)
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
    confirmationRequired.value = true
    return select(value, false)
  }
  const useSeconds = computed(() => resolveTimeFormat(props).useSeconds)
  const pickerBindingProps = computed(() => getTimeWheelPresentationProps(props.pickerProps))
  const pickerState = computed(() => getTimePickerState(draft.value, props))
  const pickerColumns = computed(() => pickerState.value.columns)
  const pickerValue = computed(() => pickerState.value.value)
  function handlePickerChange(values: (string | number)[]) {
    if (props.disabled || props.readonly) {
      return
    }
    const value = getTimePickerChange(values, props, draft.value)
    if (value !== undefined) {
      select(value, props.disableConfirm && !confirmationRequired.value)
    }
  }
  return {
    confirmationRequired,
    nowDisabled,
    selectNow,
    useSeconds,
    pickerBindingProps,
    pickerColumns,
    pickerValue,
    handlePickerChange,
  }
}
