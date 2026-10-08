<template>
  <DatePanelContent
    v-bind="$attrs"
    :options="options"
    :range="isRange"
    :value="selection.draft.value"
    :can-confirm="selection.canConfirm.value"
    @select="select"
    @confirm="selection.commit()"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </DatePanelContent>
</template>
<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { provideRangePanel } from '../_components/picker-field/range-field-context'
import { useFieldValue } from '../_components/picker-field/use-field-value'
import { createNamespace } from '../utils/components'
import { dateEventPayload, type DateSelection } from './date-value'
import type { DatePanelOptions } from './panel-state'
import DatePanelContent from './presentation/DatePanelContent.vue'
import { useDateSelection } from './use-date-selection'

defineOptions({ name: createNamespace('date-panel').name, inheritAttrs: false })
const props = defineProps({ options: { type: Object as PropType<DatePanelOptions>, required: true }, range: Boolean })
const emit = defineEmits(['update:modelValue', 'change', 'select', 'confirm'])
provideRangePanel()
const isRange = computed(() => props.range || Boolean(props.options.range))
const model = useFieldValue<DateSelection>({
  value: () => props.options.modelValue,
  defaultValue: () => props.options.defaultValue ?? (isRange.value || props.options.multiple ? [] : undefined),
})
const selection = useDateSelection({
  value: () => model.value.value,
  rules: () => props.options,
  range: () => isRange.value,
  multiple: () => Boolean(props.options.multiple),
  blocked: () =>
    Boolean(
      props.options.readonly ||
      (Array.isArray(props.options.disabled) ? props.options.disabled.every(Boolean) : props.options.disabled),
    ),
  disabledParts: () => (Array.isArray(props.options.disabled) ? props.options.disabled : []),
  onSelect: (value) => {
    const payload = dateEventPayload(value, props.options)
    emit('select', value, payload.dates, payload.texts)
  },
  onCommit: (value) => {
    model.setValue(value)
    const payload = dateEventPayload(value, props.options)
    emit('update:modelValue', value)
    emit('change', value, payload.dates, payload.texts)
  },
  onConfirm: () => {
    const value = selection.draft.value
    const payload = dateEventPayload(value, props.options)
    emit('confirm', value, payload.dates, payload.texts)
  },
})
function select(value: DateSelection) {
  selection.select(value, props.options.disableConfirm !== false)
}
</script>
