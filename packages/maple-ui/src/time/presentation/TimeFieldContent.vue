<template>
  <div
    v-bind="splitInputAttrs($attrs).root"
    :class="rootClass"
    :tabindex="-1"
    @focus="state.focus"
    @blur="state.blur"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
  >
    <PickerField
      v-bind="{ ...splitInputAttrs($attrs).native, ...state.controlProps.value }"
      ref="field"
      :aria-controls="state.open.value ? popupId : undefined"
      :editable="fieldProps.inputEditable"
      :cursor="state.disabled.value || state.readonly.value || fieldProps.inputEditable ? '' : 'pointer'"
      @commit="state.commitText"
      @click="click"
      @clear="state.clear"
      @focus="state.focus"
      @blur="state.blur"
    >
      <template v-for="name in fieldSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
      <template v-if="fieldProps.inputEditable || $slots['suffix-icon']" #arrow-icon="scope">
        <button
          v-if="fieldProps.inputEditable"
          type="button"
          :class="n('input-trigger')"
          :aria-label="locale.title()"
          aria-haspopup="dialog"
          :aria-expanded="state.open.value"
          :aria-controls="state.open.value ? popupId : undefined"
          :disabled="state.disabled.value || state.readonly.value"
          @click.stop="openPanel"
        >
          <slot name="suffix-icon" v-bind="scope"><IconClockCircle aria-hidden="true" /></slot>
        </button>
        <slot v-else name="suffix-icon" v-bind="scope" />
      </template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
    </PickerField>
    <TimePopup
      :id="popupId"
      :aria-label="title"
      :open="state.open.value"
      :range="range"
      :popup-props="popupProps"
      :title="title"
      :cancel-text="locale.cancel()"
      :confirm-text="locale.confirm()"
      :disable-confirm="fieldProps.disableConfirm"
      :can-confirm="state.canConfirm.value"
      @cancel="state.cancel"
      @update:open="state.setOpen"
      @confirm="state.confirm()"
    >
      <TimeRangePicker
        v-if="range"
        v-bind="{ ...rangePanelProps, ...rules }"
        :model-value="rangeDraft"
        disable-confirm
        :show-next-day="'showNextDay' in fieldProps && fieldProps.showNextDay"
        :time-picker-props="timePanelProps"
        :picker-props="wheelProps"
        @select="select"
      >
      </TimeRangePicker>
      <MpPicker
        v-else-if="fieldProps.presentation === 'picker'"
        v-bind="wheelProps"
        :toolbar="false"
        :columns="pickerState.columns"
        :model-value="pickerState.value"
        @change="pickerChange"
      />
      <TimePicker
        v-else
        v-bind="{ ...timePanelProps, ...rules }"
        :model-value="singleDraft"
        presentation="clock"
        disable-confirm
        @select="select"
      >
      </TimePicker>
    </TimePopup>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue'
import { IconClockCircle } from '@maplejs/icons-vue'
import PickerField from '../../_components/picker-field/PickerField.vue'
import { splitInputAttrs } from '../../input/native-attrs'
import { _PickerComponent as MpPicker } from '../../picker'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import { createNamespace } from '../../utils/components'
import type { TimeFieldContentProps } from '../field-state'
import { getTimePickerChange, getTimePickerState } from '../picker-columns'
import {
  getTimePanelPresentationProps,
  getTimePopupPresentationProps,
  getTimeWheelPresentationProps,
} from '../presentation-props'
import type { TimeCommitInput } from '../time-commit'
import { formatTimeValue } from '../time-value'
import TimePicker from '../TimePicker.vue'
import TimePopup from './TimePopup.vue'
import { useTimeFieldLocale } from './use-field-locale'
import { useTriggerKeyboard } from './use-trigger-keyboard'

defineOptions({ name: createNamespace('time-field-content').name, inheritAttrs: false })
const props = defineProps<TimeFieldContentProps>()
const popupId = useId()
const { n } = createNamespace('time')
const field = ref<InstanceType<typeof PickerField>>()
const locale = useTimeFieldLocale()
const { handleKeydown, handleKeyup } = useTriggerKeyboard({
  open: props.state.open,
  blocked: () => props.state.disabled.value || props.state.readonly.value,
  cancel: () => props.state.cancel(),
  beforeOpen: (event) => field.value?.commit(event),
})
const timePanelProps = computed(() => getTimePanelPresentationProps(props.fieldProps.timePickerProps))
const rangePanelProps = computed(() =>
  getTimePanelPresentationProps(
    'timeRangePickerProps' in props.fieldProps ? props.fieldProps.timeRangePickerProps : undefined,
  ),
)
const wheelProps = computed(() => getTimeWheelPresentationProps(props.fieldProps.pickerProps))
const popupProps = computed(() => ({
  placement: 'bottom' as const,
  ...getTimePopupPresentationProps(props.fieldProps.popupProps),
  popupContainer:
    props.fieldProps.popupContainer !== undefined
      ? props.fieldProps.popupContainer
      : props.fieldProps.popupProps?.popupContainer,
}))
const title = computed(
  () =>
    props.fieldProps.timePickerProps?.hint ??
    (props.range ? props.fieldProps.pickerProps?.title : undefined) ??
    locale.title(),
)
const singleDraft = computed(() => {
  const value = props.state.draft.value
  return Array.isArray(value) ? undefined : formatTimeValue(value, props.fieldProps)
})
const rangeDraft = computed(() => {
  const value = props.state.draft.value
  return Array.isArray(value) ? value.map((part) => formatTimeValue(part, props.fieldProps) ?? '') : undefined
})
const pickerState = computed(() => getTimePickerState(singleDraft.value, props.fieldProps))
const rules = computed(() => {
  const options = props.fieldProps
  return {
    presentation: options.presentation,
    hideDisabledOptions: options.hideDisabledOptions,
    format: options.format,
    use12Hours: options.use12Hours,
    step: options.step,
    min: options.min,
    max: options.max,
    disabledHours: options.disabledHours,
    disabledMinutes: options.disabledMinutes,
    disabledSeconds: options.disabledSeconds,
    readonly: props.state.readonly.value,
    disabled: props.state.disabled.value,
  }
})
function select(value: TimeCommitInput) {
  props.state.select(value, props.fieldProps.disableConfirm)
}
function click(event: Event) {
  props.state.click(event)
  const target = event.target as HTMLElement | null
  if (props.fieldProps.inputEditable && target?.closest('input')) {
    return
  }
  if (!props.state.disabled.value && !props.state.readonly.value) {
    field.value?.commit(event)
    props.state.setOpen(true)
  }
}
function openPanel(event: MouseEvent) {
  props.state.click(event)
  if (!props.state.disabled.value && !props.state.readonly.value) {
    field.value?.blur()
    props.state.setOpen(true)
  }
}
function pickerChange(values: (string | number)[]) {
  if (props.state.disabled.value || props.state.readonly.value) {
    return
  }
  const value = getTimePickerChange(values, props.fieldProps)
  if (value !== undefined) {
    select(value)
  }
}
const slots = useSlots()
const fieldNames = ['prefix', 'selected', 'separator', 'clear-icon']
const fieldSlots = computed(() => fieldNames.filter((name) => Boolean(slots[name])))
defineExpose({ focus: (index = 0) => field.value?.focus(index), blur: () => field.value?.blur() })
</script>
