<template>
  <Trigger
    v-bind="popupProps"
    :popup-class="[fieldProps.popupProps?.popupClass, 'mp-date-field-popover']"
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
        :cursor="state.disabled.value || state.readonly.value || state.controlProps.value.editable ? '' : 'pointer'"
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
      <div
        v-if="state.open.value"
        :id="popupId"
        class="mp-date-field-panel"
        :class="{
          'mp-date-field-panel--time': panelProps.showTime,
        }"
        role="dialog"
        :aria-label="locale.title()"
      >
        <DatePanel
          :endpoint-editor="range"
          :options="panelProps"
          :range="range"
          @draft-initialize="state.initialize"
          @select="(value) => state.select(value, fieldProps.disableConfirm && !quickConfirmRequired)"
          @confirm="(value) => state.confirm(value)"
          @update:picker-value="emit('update:pickerValue', $event)"
          @picker-value-change="(value, dates, texts) => emit('picker-value-change', value, dates, texts)"
          @select-shortcut="emit('select-shortcut', $event)"
        >
          <template v-for="name in panelSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
        </DatePanel>
      </div>
    </template>
  </Trigger>
</template>
<script setup lang="ts">
import { computed, provide, ref, useSlots, watch } from 'vue'
import { isFieldOpenClick } from '../../_components/picker-field/open-trigger'
import PickerField from '../../_components/picker-field/PickerField.vue'
import { splitInputAttrs } from '../../input/native-attrs'
import { useTriggerKeyboard } from '../../time/presentation/use-trigger-keyboard'
import Trigger from '../../trigger'
import { createNamespace } from '../../utils/components'
import { useId } from '../../utils/vue-compat'
import DatePanel from '../DatePanel.vue'
import { dateFieldPanelOptions } from '../field-panel-options'
import type { DateFieldContentProps } from '../field-state'
import { datePresentationOptions } from '../presentation-options'
import { rangeQuickConfirmRequired } from '../range-quick-selection'
import { useDateFieldLocale } from './use-field-locale'

defineOptions({ name: createNamespace('date-field-content').name, inheritAttrs: false })
const props = defineProps<DateFieldContentProps>()
const quickConfirmRequired = ref(false)
provide(rangeQuickConfirmRequired, quickConfirmRequired)
watch(props.state.open, (open) => {
  if (!open) {
    quickConfirmRequired.value = false
  }
})
const emit = defineEmits(['update:pickerValue', 'picker-value-change', 'select-shortcut'])
const popupId = useId()
const { n } = createNamespace('date')
const field = ref<InstanceType<typeof PickerField>>()
const locale = useDateFieldLocale()
const { handleKeydown, handleKeyup } = useTriggerKeyboard({
  open: props.state.open,
  blocked: () => props.state.disabled.value || props.state.readonly.value,
  cancel: props.state.cancel,
  beforeOpen: (event) => field.value?.commit(event),
})
const popupProps = computed(() => ({
  placement: 'bottom-start' as const,
  ...datePresentationOptions(props.fieldProps.popupProps),
  popupContainer:
    props.fieldProps.popupContainer !== undefined
      ? props.fieldProps.popupContainer
      : props.fieldProps.popupProps?.popupContainer,
}))
const panelProps = computed(() => ({
  ...dateFieldPanelOptions(props.fieldProps, props.range),
  // Honor the field's content mode in inline popovers as well as hosted editors.
  presentation: props.fieldProps.panelType ?? (props.fieldProps.showTime ? 'calendarPicker' : 'calendar'),
  modelValue: props.state.draft.value,
  defaultValue: undefined,
  disableConfirm: props.fieldProps.disableConfirm,
  disabled: props.range ? props.state.disabledParts.value : props.state.disabled.value,
  readonly: props.state.readonly.value,
}))
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
const panelSlots = computed(() =>
  Object.keys(slots).filter((name) => ![...fieldNames, 'default', 'suffix', 'suffix-icon'].includes(name)),
)
defineExpose({ focus: (index = 0) => field.value?.focus(index), blur: () => field.value?.blur() })
</script>
