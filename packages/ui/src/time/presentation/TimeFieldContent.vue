<template>
  <Trigger
    v-bind="popupProps"
    :popup-class="[fieldProps.popupProps?.popupClass, 'mp-time-field-popover']"
    :trigger="[]"
    :unmount-on-close="true"
    :open="state.open.value"
    :disabled="state.disabled.value || state.readonly.value"
    :close-on-click-reference="false"
    :prevent-focus="true"
    :popup-offset="4"
    @update:open="state.setOpen"
  >
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
        :loading="fieldProps.loading"
        :loading-mode="fieldProps.loadingMode"
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
        <template v-if="$slots['suffix-icon']" #arrow-icon="scope"><slot name="suffix-icon" v-bind="scope" /></template>
        <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
      </PickerField>
    </div>
    <template #content>
      <TimeFieldPanel
        v-if="state.open.value"
        :id="popupId"
        role="dialog"
        :aria-label="title"
        :range="range"
        :disable-confirm="fieldProps.disableConfirm && !confirmationRequired"
        :can-confirm="state.canConfirm.value"
        :confirm-text="locale.confirm()"
        @confirm="state.confirm()"
      >
        <TimeRangePicker
          v-if="range"
          v-bind="{ ...rangePanelProps, ...rules }"
          :model-value="rangeDraft"
          disable-confirm
          :show-next-day="'showNextDay' in fieldProps && fieldProps.showNextDay"
          :picker-props="wheelProps"
          :show-now-button="'showNowButton' in fieldProps ? fieldProps.showNowButton : true"
          @draft-initialize="state.draft.value = $event"
          @select="select"
        >
        </TimeRangePicker>
        <TimePicker
          v-else
          v-bind="{ ...singlePanelProps, ...rules }"
          :model-value="singleDraft"
          disable-confirm
          :show-now-button="fieldProps.showNowButton !== false"
          :picker-props="wheelProps"
          @draft-initialize="state.draft.value = $event"
          @select="select"
        />
      </TimeFieldPanel>
    </template>
  </Trigger>
</template>
<script setup lang="ts">
import { computed, provide, ref, useSlots, watch } from 'vue'
import { isFieldOpenClick } from '../../_components/picker-field/open-trigger'
import PickerField from '../../_components/picker-field/PickerField.vue'
import { splitInputAttrs } from '../../input/native-attrs'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Trigger from '../../trigger'
import { createNamespace } from '../../utils/components'
import { useId } from '../../utils/vue-compat'
import type { TimeFieldContentProps } from '../field-state'
import {
  getTimePanelPresentationProps,
  getTimePopupPresentationProps,
  getTimeWheelPresentationProps,
} from '../presentation-props'
import type { TimeCommitInput } from '../time-commit'
import { formatTimeValue } from '../time-value'
import TimePicker from '../TimePicker.vue'
import { timeExplicitConfirmation } from './confirmation-context'
import TimeFieldPanel from './TimeFieldPanel.vue'
import { useTimeFieldLocale } from './use-field-locale'
import { useTriggerKeyboard } from './use-trigger-keyboard'

defineOptions({ name: createNamespace('time-field-content').name, inheritAttrs: false })
const props = defineProps<TimeFieldContentProps>()
const popupId = useId()
const { n } = createNamespace('time')
const field = ref<InstanceType<typeof PickerField>>()
const locale = useTimeFieldLocale()
const confirmationRequired = ref(false)
provide(timeExplicitConfirmation, confirmationRequired)
watch(props.state.open, (open) => {
  if (!open) {
    confirmationRequired.value = false
  }
})
const { handleKeydown, handleKeyup } = useTriggerKeyboard({
  open: props.state.open,
  blocked: () => props.state.disabled.value || props.state.readonly.value,
  cancel: () => props.state.cancel(),
  beforeOpen: (event) => field.value?.commit(event),
})
const rangePanelProps = computed(() =>
  getTimePanelPresentationProps(
    'timeRangePickerProps' in props.fieldProps ? props.fieldProps.timeRangePickerProps : undefined,
  ),
)
const singlePanelProps = computed(() =>
  getTimePanelPresentationProps('timePickerProps' in props.fieldProps ? props.fieldProps.timePickerProps : undefined),
)
const wheelProps = computed(() => getTimeWheelPresentationProps(props.fieldProps.pickerProps))
const popupProps = computed(() => ({
  placement: 'bottom-start' as const,
  ...getTimePopupPresentationProps(props.fieldProps.popupProps),
  popupContainer:
    props.fieldProps.popupContainer !== undefined
      ? props.fieldProps.popupContainer
      : props.fieldProps.popupProps?.popupContainer,
}))
const title = computed(() => locale.title())
const singleDraft = computed(() => {
  const value = props.state.draft.value
  return Array.isArray(value) ? undefined : (formatTimeValue(value, props.fieldProps) ?? value ?? undefined)
})
const rangeDraft = computed(() => {
  const value = props.state.draft.value
  return Array.isArray(value) ? value.map((part) => formatTimeValue(part, props.fieldProps) ?? part ?? '') : undefined
})
const rules = computed(() => {
  const options = props.fieldProps
  return {
    hideDisabledOptions: options.hideDisabledOptions,
    format: options.format,
    timeFields: options.timeFields,
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
  props.state.select(value, props.fieldProps.disableConfirm && !confirmationRequired.value)
}
function click(event: Event) {
  props.state.click(event)
  if (!isFieldOpenClick(event, props.fieldProps.openTriggerTarget)) {
    return
  }
  if (!props.state.disabled.value && !props.state.readonly.value) {
    field.value?.commit(event)
    props.state.setOpen(true)
  }
}
const slots = useSlots()
const fieldNames = ['prefix', 'selected', 'separator', 'clear-icon']
const fieldSlots = computed(() => fieldNames.filter((name) => Boolean(slots[name])))
defineExpose({ focus: (index = 0) => field.value?.focus(index), blur: () => field.value?.blur() })
</script>
