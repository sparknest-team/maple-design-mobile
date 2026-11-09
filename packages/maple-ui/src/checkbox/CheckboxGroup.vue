<template>
  <div
    v-bind="$attrs"
    :aria-describedby="describeError($attrs['aria-describedby'])"
    :class="classes(n(), n(`--${resolvedOrientation}`))"
    :aria-busy="source.loading.value || undefined"
    role="group"
    :aria-label="ariaLabel"
    :aria-disabled="mergedDisabled || undefined"
  >
    <template v-if="props.options !== undefined">
      <checkbox
        v-for="option in normalizedOptions"
        :key="`${typeof option.value}:${String(option.value)}`"
        edit-mode="direct"
        :value="option.value"
        :disabled="option.disabled"
        :readonly="option.readonly"
        :indeterminate="option.indeterminate"
      >
        <template #default="{ checked }">
          <slot name="label" :data="option" :checked="checked">
            <choice-label
              :content="typeof option.label === 'function' ? option.label(option, checked) : option.label"
            />
          </slot>
        </template>
      </checkbox>
    </template>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, useSlots } from 'vue'
import { useOptionRequest } from '../_hooks/use-option-request'
import { useFormErrorDescription } from '../form/error-description'
import { createNamespace } from '../utils/components'
import { ChoiceLabel } from './choice-label'
import { normalizeChoiceOptions } from './choice-options'
import { choiceLimit, useChoiceState } from './choice-state'
import type { ChoiceValue } from './choice-value-props'
import { checkboxGroupKey } from './context'
import Checkbox from './presentation'
import { checkboxGroupProps } from './props'
import type { CheckboxGroupSlots } from './types'
import { useCheckboxGroupMethods } from './use-checkbox-group-methods'
import { useChoiceForm } from './use-choice-form'

defineOptions({ name: createNamespace('checkbox-group').name, inheritAttrs: false })
const { n, classes } = createNamespace('checkbox-group')
const props = defineProps(checkboxGroupProps)
const { errorId, describe: describeError } = useFormErrorDescription()
const resolvedOrientation = computed(() => (props.orientation === 'vertical' ? 'vertical' : 'horizontal'))
const slots = useSlots()
defineSlots<CheckboxGroupSlots>()
const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [open: boolean]
  'load-error': [error: unknown]
  'update:modelValue': [value: ChoiceValue[] | null]
  change: [value: ChoiceValue[] | null, event?: Event]
}>()
const { mergedDisabled, mergedReadonly, mergedError, eventHandlers } = useChoiceForm(props)
const source = useOptionRequest(
  () => props.options,
  () => mergedDisabled.value || mergedReadonly.value || !!props.readPretty,
  (error) => emit('load-error', error),
  () => 0,
  checkboxGroupProps,
)
const { value: computedValue, commit: handleChange } = useChoiceState(
  () => (props.modelValue === null ? [] : props.modelValue),
  props.defaultValue,
  (value, event) => {
    emit('update:modelValue', value)
    emit('change', value, event)
    eventHandlers.value?.onChange?.(event)
  },
  () => mergedDisabled.value || mergedReadonly.value,
)
const normalizedOptions = computed(() => normalizeChoiceOptions(source.options.value, props.fieldNames))
const isMaxed = computed(() => computedValue.value.length >= choiceLimit(props.max))
const { register: registerChoice, methods } = useCheckboxGroupMethods(
  () => computedValue.value,
  handleChange,
  () => mergedDisabled.value || mergedReadonly.value,
  () => props.max,
)
provide(
  checkboxGroupKey,
  reactive({
    registerChoice,
    computedValue,
    disabled: mergedDisabled,
    readonly: mergedReadonly,
    error: mergedError,
    formErrorId: errorId,
    isMaxed,
    name: computed(() => props.name),
    slots,
    handleChange,
  }),
)
defineExpose(methods)
</script>
