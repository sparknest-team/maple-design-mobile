<template>
  <TimeFieldContent
    v-bind="$attrs"
    ref="content"
    :field-props="fieldProps"
    :range="range"
    :root-class="rootClass"
    :state="state"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </TimeFieldContent>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { provideRangeField } from '../_components/picker-field/range-field-context'
import { useFieldOpen } from '../_components/picker-field/use-field-open'
import { cloneFieldValue, useFieldValue } from '../_components/picker-field/use-field-value'
import { createNamespace } from '../utils/components'
import { resolveTimeFieldPlaceholders } from './field-placeholders'
import type { TimeFieldControlProps, TimeFieldProps, TimeFieldState } from './field-state'
import { initializeTimeFieldDraft } from './presentation/initialize-field-draft'
import TimeFieldContent from './presentation/TimeFieldContent.vue'
import { useTimeFieldForm } from './presentation/use-field-form'
import { useTimeFieldLocale } from './presentation/use-field-locale'
import type { TimeCommitInput } from './time-commit'
import { formatTimeValue, toClockValue } from './time-value'
import { useTimeFieldController } from './use-time-field-controller'

defineOptions({ name: createNamespace('time-field').name, inheritAttrs: false })
const props = defineProps({
  fieldProps: { type: Object as PropType<TimeFieldProps>, required: true },
  range: Boolean,
  rootClass: String,
})
const emit = defineEmits([
  'update:modelValue',
  'update:open',
  'change',
  'select',
  'clear',
  'click',
  'open-change',
  'focus',
  'blur',
])
const content = ref<InstanceType<typeof TimeFieldContent>>()
provideRangeField()
const model = useFieldValue<TimeCommitInput>({
  value: () => props.fieldProps.modelValue,
  defaultValue: () => props.fieldProps.defaultValue,
})
const form = useTimeFieldForm(() => props.fieldProps)
const locale = useTimeFieldLocale()
const blocked = computed(() => form.disabled.value || form.readonly.value)
const open = useFieldOpen({
  value: () => props.fieldProps.open,
  defaultValue: () => props.fieldProps.defaultOpen,
  blocked: () => blocked.value,
  onChange: (next) => {
    emit('update:open', next)
    emit('open-change', next)
  },
})
const transaction = useTimeFieldController<TimeCommitInput>({
  value: () => model.value.value,
  open,
  clone: cloneFieldValue,
  initialize: (value) => initializeTimeFieldDraft(value, props.fieldProps, props.range),
  blocked: () => blocked.value,
  rules: () => props.fieldProps,
  range: () => props.range,
  disabled: () => form.disabled.value,
  clearable: () => Boolean(props.fieldProps.clearable),
  onCommit: (next, dates) => {
    model.setValue(next)
    emit('update:modelValue', next)
    emit('change', next, dates)
  },
  onSelect: (next, dates) => emit('select', next, dates),
  onClear: () => emit('clear'),
  onFocus: () => emit('focus'),
  onBlur: () => emit('blur'),
  form: () => form.events.value,
})
const controlProps = computed<TimeFieldControlProps>(() => {
  const options = props.fieldProps
  const value = model.value.value
  const values = Array.isArray(value) ? value : props.range ? [] : [value]
  const placeholders = resolveTimeFieldPlaceholders(options.placeholder, locale.placeholder(props.range), props.range)
  const start = Array.isArray(value) ? toClockValue(value[0], options) : undefined
  const end = Array.isArray(value) ? toClockValue(value[1], options) : undefined
  return {
    kind: 'time',
    range: props.range,
    texts: values.map((part) => formatTimeValue(part, options) ?? ''),
    placeholders,
    placeholder: placeholders[0],
    endHint:
      props.range && 'showNextDay' in options && options.showNextDay && start && end && start > end
        ? locale.nextDay()
        : undefined,
    separator: 'separator' in options ? options.separator : ' ~ ',
    open: open.value,
    focused: transaction.focused.value,
    disabled: form.disabled.value,
    readonly: form.readonly.value,
    error: form.error.value,
    size: form.size.value,
    hint: form.hint.value,
    variant: options.variant,
    line: options.line,
    textColor: options.textColor,
    focusColor: options.focusColor,
    blurColor: options.blurColor,
    clearable: options.clearable && !form.readonly.value,
  }
})
const state: TimeFieldState = {
  open,
  setOpen: (value) => {
    open.value = value
  },
  draft: transaction.draft,
  canConfirm: transaction.canConfirm,
  disabled: form.disabled,
  readonly: form.readonly,
  feedback: form.feedback,
  controlProps,
  focus: transaction.handleFocus,
  blur: transaction.handleBlur,
  clear: transaction.clearField,
  select: transaction.select,
  confirm: transaction.commit,
  cancel: transaction.cancel,
  commitText: (value) => {
    transaction.commit(props.range ? value : value[0])
  },
  click: (event) => {
    if (form.disabled.value) {
      return
    }
    emit('click', event)
  },
}
defineExpose({
  focus: (index = 0) => content.value?.focus(index),
  blur: () => {
    content.value?.blur()
    open.value = false
  },
})
</script>
