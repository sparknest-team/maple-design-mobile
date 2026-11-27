<template>
  <DateFieldContent
    v-bind="$attrs"
    ref="content"
    :field-props="fieldProps"
    :range="range"
    :root-class="rootClass"
    :state="state"
    @update:picker-value="emit('update:pickerValue', $event)"
    @picker-value-change="(value, dates, texts) => emit('picker-value-change', value, dates, texts)"
    @select-shortcut="emit('select-shortcut', $event)"
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
import { resolveEmptyValue, useEmptyValues } from '../utils/empty-value'
import { scopeDateOptions } from './date-locale'
import { isDateEndpointSelectionValid } from './date-rules'
import { dateEventPayload, formatDateValue, outputDateValue, parseDateText } from './date-value'
import { dateFieldPanelOptions } from './field-panel-options'
import type { DateFieldControlProps, DateFieldProps, DateFieldState } from './field-state'
import DateFieldContent from './presentation/DateFieldContent.vue'
import { useDateLocale } from './presentation/use-date-locale'
import { useDateFieldForm } from './presentation/use-field-form'
import { useDateFieldLocale } from './presentation/use-field-locale'
import { useDateSelection } from './use-date-selection'

defineOptions({ name: createNamespace('date-field').name, inheritAttrs: false })
const props = defineProps({
  fieldProps: { type: Object as PropType<DateFieldProps>, required: true },
  range: Boolean,
  endpointSelection: Boolean,
  rootClass: String,
})
const emit = defineEmits([
  'update:modelValue',
  'update:open',
  'update:pickerValue',
  'picker-value-change',
  'select-shortcut',
  'change',
  'select',
  'clear',
  'click',
  'open-change',
  'focus',
  'blur',
])
const language = useDateLocale()
const fieldProps = computed(() =>
  scopeDateOptions(
    props.fieldProps,
    language.value,
    dateFieldPanelOptions(props.fieldProps, props.range).dayStartOfWeek ?? 0,
  ),
)
const content = ref<InstanceType<typeof DateFieldContent>>()
const rangeIndex = provideRangeField()
const model = useFieldValue<Date | string | number | (Date | string | number | null | undefined)[] | null | undefined>({
  value: () => fieldProps.value.modelValue,
  defaultValue: () => fieldProps.value.defaultValue,
})
const emptyPolicy = useEmptyValues({
  get emptyValues() {
    return fieldProps.value.emptyValues
  },
})
const viewValue = computed(() =>
  emptyPolicy.hasCustomEmptyValues.value && emptyPolicy.isEmpty(model.value.value) ? undefined : model.value.value,
)
const form = useDateFieldForm(() => fieldProps.value)
const locale = useDateFieldLocale()
const disabledParts = computed(() =>
  [0, 1].map(
    (index) =>
      form.disabled.value || Boolean(Array.isArray(fieldProps.value.disabled) && fieldProps.value.disabled[index]),
  ),
)
const disabled = computed(() => (props.range ? disabledParts.value.every(Boolean) : form.disabled.value))
const blocked = computed(() => disabled.value || form.readonly.value)
const open = useFieldOpen({
  value: () => fieldProps.value.open,
  defaultValue: () => fieldProps.value.defaultOpen,
  blocked: () => blocked.value,
  onChange: (value) => {
    emit('update:open', value)
    emit('open-change', value)
  },
})
const selection = useDateSelection({
  emptyValue: () =>
    resolveEmptyValue<Date | string | number | (Date | string | number | null | undefined)[] | null | undefined>(
      fieldProps.value,
      props.range ? [] : undefined,
    ),
  value: () => viewValue.value,
  rules: () => fieldProps.value,
  range: () => props.range,
  allowReversedDraft: () => props.range,
  validate: props.endpointSelection
    ? (value) => isDateEndpointSelectionValid(value, fieldProps.value, rangeIndex.value)
    : undefined,
  multiple: () => 'multiple' in fieldProps.value && Boolean(fieldProps.value.multiple),
  disabledParts: () => (props.range ? disabledParts.value : []),
  blocked: () => blocked.value,
  onSelect: (value) => {
    const payload = dateEventPayload(value, fieldProps.value)
    emit('select', value, payload.dates, payload.texts)
  },
  onCommit: (value) => {
    model.setValue(value)
    const payload = dateEventPayload(value, fieldProps.value)
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
  const options = fieldProps.value
  const value = viewValue.value
  const values = Array.isArray(value) ? value : [value]
  const placeholder = options.placeholder ?? locale.placeholder(props.range, options.type)
  const placeholders = Array.isArray(placeholder)
    ? placeholder
    : props.range
      ? [placeholder, placeholder]
      : [placeholder]
  return {
    kind: 'date',
    openTriggerTarget: options.openTriggerTarget,
    inputAttrs: 'inputAttrs' in options ? options.inputAttrs : undefined,
    editable:
      options.inputEditable !== false &&
      typeof options.format !== 'function' &&
      !('multiple' in options && options.multiple),
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
    if (!fieldProps.value.clearable || !selection.clear()) {
      return false
    }
    emit('clear')
    form.events.value?.onClear?.()
    return true
  },
  initialize: selection.initialize,
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
      const date = parseDateText(text, fieldProps.value)
      return date && outputDateValue(date.toDate(), fieldProps.value)
    })
    if (values.some((value) => value === undefined)) {
      return
    }
    const previous = model.value.value
    if (props.range && Array.isArray(previous)) {
      values.forEach((_, index) => {
        if (disabledParts.value[index]) {
          values[index] = previous[index] ?? undefined
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
