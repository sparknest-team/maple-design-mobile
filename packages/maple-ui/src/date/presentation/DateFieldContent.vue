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
      :cursor="state.disabled.value || state.readonly.value ? '' : 'pointer'"
      @click="click"
      @clear="state.clear"
      @focus="state.focus"
      @blur="state.blur"
    >
      <template v-for="name in fieldSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
      <template v-if="$slots['suffix-icon']" #arrow-icon="scope"><slot name="suffix-icon" v-bind="scope" /></template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
    </PickerField>
    <DatePopup
      :open="state.open.value"
      :range="range"
      :popup-props="popupProps"
      :title="locale.title()"
      :cancel-text="locale.cancel()"
      :confirm-text="locale.confirm()"
      :disable-confirm="fieldProps.disableConfirm"
      :can-confirm="state.canConfirm.value"
      @cancel="state.cancel"
      @update:open="state.setOpen"
      @confirm="state.confirm()"
    >
      <DatePanel
        :options="panelProps"
        :range="range"
        @select="(value) => state.select(value, fieldProps.disableConfirm)"
      >
        <template v-for="name in panelSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
      </DatePanel>
    </DatePopup>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import PickerField from '../../_components/picker-field/PickerField.vue'
import { splitInputAttrs } from '../../input/native-attrs'
import { useTriggerKeyboard } from '../../time/presentation/use-trigger-keyboard'
import { createNamespace } from '../../utils/components'
import DatePanel from '../DatePanel.vue'
import { dateFieldPanelOptions } from '../field-panel-options'
import type { DateFieldContentProps } from '../field-state'
import { datePresentationOptions } from '../presentation-options'
import DatePopup from './DatePopup.vue'
import { useDateFieldLocale } from './use-field-locale'

defineOptions({ name: createNamespace('date-field-content').name, inheritAttrs: false })
const props = defineProps<DateFieldContentProps>()
const field = ref<InstanceType<typeof PickerField>>()
const locale = useDateFieldLocale()
const { handleKeydown, handleKeyup } = useTriggerKeyboard({
  open: props.state.open,
  blocked: () => props.state.disabled.value || props.state.readonly.value,
  cancel: props.state.cancel,
})
const popupProps = computed(() => ({
  placement: 'bottom' as const,
  ...datePresentationOptions(props.fieldProps.popupProps),
  popupContainer:
    props.fieldProps.popupContainer !== undefined
      ? props.fieldProps.popupContainer
      : props.fieldProps.popupProps?.popupContainer,
}))
const panelProps = computed(() => ({
  ...dateFieldPanelOptions(props.fieldProps, props.range),
  modelValue: props.state.draft.value,
  defaultValue: undefined,
  disableConfirm: true,
  disabled: props.range ? props.state.disabledParts.value : props.state.disabled.value,
  readonly: props.state.readonly.value,
}))
function click(event: Event) {
  props.state.click(event)
  if (!props.state.disabled.value && !props.state.readonly.value) {
    props.state.setOpen(true)
  }
}
const slots = useSlots()
const fieldNames = ['prefix', 'selected', 'separator', 'clear-icon']
const fieldSlots = computed(() => fieldNames.filter((name) => Boolean(slots[name])))
const panelSlots = computed(() =>
  Object.keys(slots).filter((name) => ![...fieldNames, 'default', 'suffix', 'suffix-icon'].includes(name)),
)
defineExpose({ focus: (index = 0) => field.value?.focus(index), blur: () => field.value?.blur() })
</script>
