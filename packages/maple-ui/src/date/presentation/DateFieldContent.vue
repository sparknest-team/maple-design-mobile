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
      :cursor="state.disabled.value || state.readonly.value || state.controlProps.value.editable ? '' : 'pointer'"
      @commit="state.commitText"
      @click="click"
      @clear="state.clear"
      @focus="state.focus"
      @blur="state.blur"
    >
      <template v-for="name in fieldSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
      <template v-if="state.controlProps.value.editable || $slots['suffix-icon']" #arrow-icon="scope">
        <button
          v-if="state.controlProps.value.editable"
          type="button"
          :class="n('input-trigger')"
          :aria-label="locale.title()"
          aria-haspopup="dialog"
          :aria-expanded="state.open.value"
          :aria-controls="state.open.value ? popupId : undefined"
          :disabled="state.disabled.value || state.readonly.value"
          @click.stop="openPanel"
        >
          <slot name="suffix-icon" v-bind="scope"><IconCalendar aria-hidden="true" /></slot>
        </button>
        <slot v-else name="suffix-icon" v-bind="scope" />
      </template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
    </PickerField>
    <DatePopup
      :id="popupId"
      :aria-label="locale.title()"
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
        @update:picker-value="emit('update:pickerValue', $event)"
        @picker-value-change="(value, dates, texts) => emit('picker-value-change', value, dates, texts)"
        @select-shortcut="emit('select-shortcut', $event)"
      >
        <template v-for="name in panelSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
      </DatePanel>
    </DatePopup>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue'
import { IconCalendar } from '@maplejs/icons-vue'
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
  const target = event.target as HTMLElement | null
  if (props.state.controlProps.value.editable && target?.closest('input')) {
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
const slots = useSlots()
const fieldNames = ['prefix', 'selected', 'separator', 'clear-icon']
const fieldSlots = computed(() => fieldNames.filter((name) => Boolean(slots[name])))
const panelSlots = computed(() =>
  Object.keys(slots).filter((name) => ![...fieldNames, 'default', 'suffix', 'suffix-icon'].includes(name)),
)
defineExpose({ focus: (index = 0) => field.value?.focus(index), blur: () => field.value?.blur() })
</script>
