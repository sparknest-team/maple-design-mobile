<template>
  <div :class="n('inputs')">
    <input-number
      v-if="range"
      mode="input"
      :model-value="modelValue[0]"
      :min="min"
      :max="modelValue[1]"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      :error="error"
      :input-attrs="{ 'aria-label': label(0) }"
      @change="(value) => emit('change', 0, value)"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
    <input-number
      mode="input"
      :model-value="modelValue[1]"
      :min="range ? modelValue[0] : min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      :error="error"
      :input-attrs="{ 'aria-label': label(1) }"
      @change="(value) => emit('change', 1, value)"
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import InputNumber from '../input-number'
import { createNamespace } from '../utils/components'
import { useSliderInputForm } from './use-slider-input-form'

defineOptions({ name: createNamespace('slider-input').name })
const { n } = createNamespace('slider')
const props = defineProps({
  modelValue: { type: Array as unknown as PropType<[number, number]>, required: true },
  min: Number,
  max: Number,
  step: Number,
  range: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  error: Boolean,
  ariaLabel: [String, Array] as PropType<string | [string, string]>,
})
const emit = defineEmits<{ change: [index: number, value?: number]; focus: []; blur: [] }>()
const label = (index: number) => (Array.isArray(props.ariaLabel) ? props.ariaLabel[index] : props.ariaLabel)
useSliderInputForm()
</script>
