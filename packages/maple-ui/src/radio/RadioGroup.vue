<script setup lang="ts">
import { computed, provide, reactive, useSlots } from 'vue'
import { ChoiceLabel } from '../checkbox/choice-label'
import { normalizeChoiceOptions } from '../checkbox/choice-options'
import { useChoiceState } from '../checkbox/choice-state'
import type { RadioModel } from '../checkbox/choice-value-props'
import { createNamespace } from '../utils/components'
import { radioGroupKey } from './context'
import { useRadioForm } from './form-adapter'
import Radio from './presentation'
import { radioGroupProps } from './props'
import { useRadioNavigation } from './use-radio-navigation'

defineOptions({ name: createNamespace('radio-group').name })
const { n, classes } = createNamespace('radio-group')
const props = defineProps(radioGroupProps)
const slots = useSlots()
const emit = defineEmits<{ 'update:modelValue': [value: RadioModel]; change: [value: RadioModel, event?: Event] }>()
const { mergedDisabled, mergedReadonly, mergedError, mergedSize, eventHandlers } = useRadioForm(props)
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
const options = computed(() => normalizeChoiceOptions(props.options, props.fieldNames))
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
    slots,
    handleChange: commit,
  }),
)
</script>
<template>
  <div
    role="radiogroup"
    :aria-label="ariaLabel"
    :aria-disabled="mergedDisabled || undefined"
    :aria-readonly="mergedReadonly || undefined"
    :aria-invalid="mergedError || undefined"
    :class="classes(n(), n(`--${direction}`), n(`--size-${mergedSize}`), [variant === 'button', n('--button')])"
    @keydown="navigation.keydown"
  >
    <template v-if="props.options !== undefined">
      <Radio
        v-for="option in options"
        :key="`${typeof option.value}:${String(option.value)}`"
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
