<script setup lang="ts">
import { computed, provide, reactive, useSlots, type HTMLAttributes } from 'vue'
import { useOptionRequest } from '../_hooks/use-option-request'
import { ChoiceLabel } from '../checkbox/choice-label'
import { normalizeChoiceOptions } from '../checkbox/choice-options'
import { useChoiceState } from '../checkbox/choice-state'
import { useFormErrorDescription } from '../form/error-description'
import { createNamespace } from '../utils/components'
import { radioGroupKey } from './context'
import { useRadioForm } from './form-adapter'
import Radio from './presentation'
import { radioGroupProps } from './props'
import type { RadioGroupSlots } from './types'
import { useRadioNavigation } from './use-radio-navigation'

defineOptions({ name: createNamespace('radio-group').name, inheritAttrs: false })
const { n, classes } = createNamespace('radio-group')
const props = defineProps(radioGroupProps)
const { errorId, describe: describeError } = useFormErrorDescription()
const resolvedOrientation = computed(() => (props.orientation === 'vertical' ? 'vertical' : 'horizontal'))
const slots = useSlots()
defineSlots<RadioGroupSlots>()
const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [open: boolean]
  'load-error': [error: unknown]
  'update:modelValue': [value: string | number | boolean | null]
  change: [value: string | number | boolean | null, event?: Event]
}>()
const { mergedDisabled, mergedReadonly, mergedError, mergedSize, eventHandlers } = useRadioForm(props)
const source = useOptionRequest(
  () => props.options,
  () => mergedDisabled.value || mergedReadonly.value || !!props.readPretty,
  (error) => emit('load-error', error),
  () => 0,
  radioGroupProps,
)
const { value, commit } = useChoiceState(
  () => props.modelValue,
  props.defaultValue,
  (next, event) => {
    emit('update:modelValue', next)
    emit('change', next, event)
    eventHandlers.value.onChange?.(event)
  },
  () => mergedDisabled.value || mergedReadonly.value,
)
const options = computed(() => normalizeChoiceOptions(source.options.value, props.fieldNames))
const navigation = useRadioNavigation(() => value.value !== null)
provide(
  radioGroupKey,
  reactive({
    navigation,
    value,
    size: mergedSize,
    variant: computed(() => props.variant),
    name: computed(() => props.name),
    disabled: mergedDisabled,
    readonly: mergedReadonly,
    error: mergedError,
    formErrorId: errorId,
    slots,
    handleChange: commit,
  }),
)
</script>
<template>
  <div
    v-bind="$attrs"
    :aria-describedby="describeError($attrs['aria-describedby'])"
    :aria-busy="source.loading.value || undefined"
    role="radiogroup"
    :aria-label="ariaLabel"
    :aria-disabled="mergedDisabled || undefined"
    :aria-readonly="mergedReadonly || undefined"
    :aria-invalid="mergedError ? true : ($attrs['aria-invalid'] as HTMLAttributes['aria-invalid'])"
    :class="
      classes(n(), n(`--${resolvedOrientation}`), n(`--size-${mergedSize}`), [variant === 'button', n('--button')])
    "
    @keydown="navigation.keydown"
  >
    <template v-if="props.options !== undefined">
      <Radio
        v-for="option in options"
        :key="`${typeof option.value}:${String(option.value)}`"
        edit-mode="direct"
        :value="option.value"
        :disabled="option.disabled"
        :readonly="option.readonly"
      >
        <template #default="{ checked }">
          <slot name="label" :data="option" :checked="checked">
            <choice-label
              :content="typeof option.label === 'function' ? option.label(option, checked) : option.label"
            />
          </slot>
        </template>
      </Radio>
    </template>
    <slot v-else />
  </div>
</template>
