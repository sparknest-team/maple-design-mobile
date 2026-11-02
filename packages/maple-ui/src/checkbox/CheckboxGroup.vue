<template>
  <div
    :class="classes(n(), n(`--${orientation}`))"
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
import { createNamespace } from '../utils/components'
import { ChoiceLabel } from './choice-label'
import { normalizeChoiceOptions } from './choice-options'
import { choiceLimit, useChoiceState } from './choice-state'
import type { ChoiceValue } from './choice-value-props'
import { checkboxGroupKey } from './context'
import Checkbox from './presentation'
import { checkboxGroupProps } from './props'
import { useCheckboxGroupMethods } from './use-checkbox-group-methods'
import { useChoiceForm } from './use-choice-form'

defineOptions({ name: createNamespace('checkbox-group').name })
const { n, classes } = createNamespace('checkbox-group')
const props = defineProps(checkboxGroupProps)
const slots = useSlots()
const emit = defineEmits<{
  'load-error': [error: unknown]
  'update:modelValue': [value: ChoiceValue[]]
  change: [value: ChoiceValue[], event?: Event]
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
    isMaxed,
    name: computed(() => props.name),
    slots,
    handleChange,
  }),
)
defineExpose(methods)
</script>
