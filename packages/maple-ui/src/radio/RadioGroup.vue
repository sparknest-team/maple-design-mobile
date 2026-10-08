<template>
  <div :class="n('wrap')">
    <div
      :aria-label="ariaLabel"
      role="radiogroup"
      :class="classes(n(), n(`--${direction}`), n(`--size-${mergedSize}`), [variant === 'button', n('--button')])"
      @keydown="navigation.keydown"
    >
      <template v-if="props.options !== undefined">
        <mp-radio
          v-for="option in normalizedOptions"
          :key="`${typeof option.value}:${String(option.value)}`"
          :value="option.value"
          :disabled="option.disabled"
          :readonly="option.readonly"
        >
          <template #default="{ checked }">
            <slot name="label" :data="option" :checked="checked">
              <choice-label :content="isFunction(option.label) ? option.label(option, checked) : option.label" />
            </slot>
          </template>
        </mp-radio>
      </template>
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isFunction } from '@maplejs/maple-shared'
import { ChoiceLabel } from '../checkbox/choice-label'
import { normalizeChoiceOptions } from '../checkbox/choice-options'
import { useChoiceState } from '../checkbox/choice-state'
import type { RadioModel } from '../checkbox/choice-value-props'
import { useChoiceForm } from '../checkbox/use-choice-form'
import { createNamespace } from '../utils/components'
import { props as radioGroupProps } from './group-props'
import { useRadios } from './group-provide'
import MpRadio from './Radio.vue'
import { useRadioNavigation } from './use-radio-navigation'

defineOptions({ name: createNamespace('radio-group').name })
const { n, classes } = createNamespace('radio-group')
const props = defineProps(radioGroupProps)
const emit = defineEmits<{
  'update:modelValue': [value: RadioModel]
  change: [value: RadioModel, event?: Event]
}>()
const { bindRadios } = useRadios()
const { mergedDisabled, mergedReadonly, mergedError, mergedSize, eventHandlers } = useChoiceForm(props)
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
const normalizedOptions = computed(() => normalizeChoiceOptions(props.options, props.fieldNames))

const navigation = useRadioNavigation(() => value.value !== null)

bindRadios({
  navigation,
  variant: computed(() => props.variant),
  modelValue: value,
  disabled: mergedDisabled,
  readonly: mergedReadonly,
  onToggle: commit,
  errorMessage: mergedError,
})
</script>
