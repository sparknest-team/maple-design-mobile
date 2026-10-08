<template>
  <div :class="n('wrap')">
    <div :class="classes(n(), n(`--${direction}`))">
      <template v-if="props.options !== undefined">
        <mp-checkbox
          v-for="option in normalizedOptions"
          :key="`${typeof option.value}:${String(option.value)}`"
          :value="option.value"
          :disabled="option.disabled"
          :readonly="option.readonly"
          :indeterminate="option.indeterminate"
        >
          <template #default="{ checked }">
            <slot name="label" :data="option" :checked="checked">
              <choice-label :content="isFunction(option.label) ? option.label(option, checked) : option.label" />
            </slot>
          </template>
        </mp-checkbox>
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
import type { ChoiceValue } from '../checkbox/choice-value-props'
import { createNamespace } from '../utils/components'
import MpCheckbox from './Checkbox.vue'
import { toggleChoice, useChoiceState } from './choice-state'
import { props as checkboxGroupProps } from './group-props'
import { useCheckboxes } from './group-provide'
import { useCheckboxGroupMethods } from './use-checkbox-group-methods'
import { useChoiceForm } from './use-choice-form'

defineOptions({ name: createNamespace('checkbox-group').name })
const { n, classes } = createNamespace('checkbox-group')
const props = defineProps(checkboxGroupProps)
const emit = defineEmits<{
  'update:modelValue': [value: ChoiceValue[]]
  change: [value: ChoiceValue[], event?: Event]
}>()
const { bindCheckboxes } = useCheckboxes()
const { mergedDisabled, mergedReadonly, mergedError, eventHandlers } = useChoiceForm(props)
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

const { register: registerChoice, methods } = useCheckboxGroupMethods(
  () => value.value,
  commit,
  () => mergedDisabled.value || mergedReadonly.value,
  () => props.max,
)

bindCheckboxes({
  registerChoice,
  modelValue: value,
  disabled: mergedDisabled,
  readonly: mergedReadonly,
  max: computed(() => props.max),
  checkedCount: computed(() => value.value.length),
  errorMessage: mergedError,
  onChecked: (item, event) => commit(toggleChoice(value.value, item, true, props.max), event),
  onUnchecked: (item, event) => commit(toggleChoice(value.value, item, false, props.max), event),
})

defineExpose(methods)
</script>
