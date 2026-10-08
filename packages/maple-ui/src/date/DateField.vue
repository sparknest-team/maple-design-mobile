<template>
  <DateFieldContent
    v-bind="$attrs"
    ref="content"
    :field-props="fieldProps"
    :range="range"
    :root-class="rootClass"
    :state="state"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </DateFieldContent>
</template>
<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { provideRangeField } from '../_components/picker-field/range-field-context'
import { useFieldFocus } from '../_components/picker-field/use-field-focus'
import { useFieldOpen } from '../_components/picker-field/use-field-open'
import { useFieldValue } from '../_components/picker-field/use-field-value'
import { createNamespace } from '../utils/components'
import {
  dateDisplayFormat,
  dateEventPayload,
  formatDateValue,
  outputDateValue,
  parseDateValue,
  type DateSelection,
} from './date-value'
import type { DateFieldControlProps, DateFieldProps, DateFieldState } from './field-state'
import DateFieldContent from './presentation/DateFieldContent.vue'
import { useDateFieldForm } from './presentation/use-field-form'
import { useDateFieldLocale } from './presentation/use-field-locale'
import { useDateSelection } from './use-date-selection'

defineOptions({ name: createNamespace('date-field').name, inheritAttrs: false })
const props = defineProps({
  fieldProps: { type: Object as PropType<DateFieldProps>, required: true },
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
const content = ref<InstanceType<typeof DateFieldContent>>()
provideRangeField()
const model = useFieldValue<DateSelection>({
  value: () => props.fieldProps.modelValue,
  defaultValue: () => props.fieldProps.defaultValue,
})
const form = useDateFieldForm(() => props.fieldProps)
const locale = useDateFieldLocale()
const disabledParts = computed(() =>
  [0, 1].map(
    (index) =>
      form.disabled.value || Boolean(Array.isArray(props.fieldProps.disabled) && props.fieldProps.disabled[index]),
  ),
)
const disabled = computed(() => (props.range ? disabledParts.value.every(Boolean) : form.disabled.value))
const blocked = computed(() => disabled.value || form.readonly.value)
const open = useFieldOpen({
  value: () => props.fieldProps.open,
  defaultValue: () => props.fieldProps.defaultOpen,
  blocked: () => blocked.value,
  onChange: (value) => {
    emit('update:open', value)
    emit('open-change', value)
  },
})
const selection = useDateSelection({
  value: () => model.value.value,
  rules: () => props.fieldProps,
  range: () => props.range,
  multiple: () => 'multiple' in props.fieldProps && Boolean(props.fieldProps.multiple),
  disabledParts: () => (props.range ? disabledParts.value : []),
  blocked: () => blocked.value,
  onSelect: (value) => {
    const payload = dateEventPayload(value, props.fieldProps)
    emit('select', value, payload.dates, payload.texts)
  },
  onCommit: (value) => {
    model.setValue(value)
    const payload = dateEventPayload(value, props.fieldProps)
    emit('update:modelValue', value)
    emit('change', value, payload.dates, payload.texts)
    form.events.value?.onChange?.()
  },
  onConfirm: () => {
    open.value = false
  },
})
watch(open, () => selection.reset(), { flush: 'sync' })
const focus = useFieldFocus({
  disabled: () => disabled.value,
  onFocus: () => {
    emit('focus')
    form.events.value?.onFocus?.()
  },
  onBlur: () => {
    emit('blur')
    form.events.value?.onBlur?.()
  },
})
const controlProps = computed<DateFieldControlProps>(() => {
  const options = props.fieldProps
  const value = model.value.value
  const values = Array.isArray(value) ? value : [value]
  const placeholder = options.placeholder ?? locale.placeholder(props.range, options.type)
  const placeholders = Array.isArray(placeholder)
    ? placeholder
    : props.range
      ? [placeholder, placeholder]
      : [placeholder]
  return {
    kind: 'date',
    range: props.range,
    texts:
      'multiple' in options && options.multiple
        ? [values.map((part) => formatDateValue(part, options)).join(options.separator ?? ', ')]
        : values.map((part) => formatDateValue(part, options)),
    placeholders,
    placeholder: placeholders[0],
    separator: options.separator,
    open: open.value,
    focused: focus.focused.value,
    disabled: disabled.value,
    disabledParts: disabledParts.value,
    readonly: form.readonly.value,
    error: form.error.value,
    size: form.size.value,
    hint: form.hint.value,
    variant: options.variant,
    line: options.line,
    textColor: options.textColor,
    focusColor: options.focusColor,
    blurColor: options.blurColor,
    clearable: options.clearable && !form.readonly.value && !disabledParts.value.some(Boolean),
  }
})
const state: DateFieldState = {
  open,
  setOpen: (value) => {
    open.value = value
  },
  draft: selection.draft,
  canConfirm: selection.canConfirm,
  disabled,
  disabledParts,
  readonly: form.readonly,
  feedback: form.feedback,
  controlProps,
  focus: focus.handleFocus,
  blur: focus.handleBlur,
  clear: () => {
    if (!props.fieldProps.clearable || !selection.clear()) {
      return false
    }
    emit('clear')
    form.events.value?.onClear?.()
    return true
  },
  select: selection.select,
  confirm: selection.commit,
  cancel: () => {
    selection.reset()
    open.value = false
  },
  click: (event) => {
    if (!disabled.value) {
      emit('click', event)
    }
  },
  commitText: (texts) => {
    const values = texts.map((text) => {
      const date = parseDateValue(text, { ...props.fieldProps, valueFormat: dateDisplayFormat(props.fieldProps) })
      return date && outputDateValue(date.toDate(), props.fieldProps)
    })
    if (values.some((value) => value === undefined)) {
      return
    }
    const previous = model.value.value
    if (props.range && Array.isArray(previous)) {
      values.forEach((_, index) => {
        if (disabledParts.value[index]) {
          values[index] = previous[index]
        }
      })
    }
    selection.select(props.range ? values : values[0], true)
  },
}
defineExpose({
  focus: (index = 0) => content.value?.focus(index),
  blur: () => {
    content.value?.blur()
    open.value = false
    focus.handleBlur()
  },
})
</script>
