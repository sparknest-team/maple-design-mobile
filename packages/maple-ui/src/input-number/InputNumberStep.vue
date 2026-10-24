<template>
  <button
    type="button"
    tabindex="-1"
    :class="n('step-button')"
    :disabled="disabled"
    :aria-label="label"
    @pointerdown="start"
    @pointerup="emit('stop')"
    @pointercancel="emit('stop')"
    @pointerleave="emit('stop')"
    @click="click"
  >
    <slot>
      <component
        :is="method === 'plus' ? (compact ? IconChevronUp : IconPlus) : compact ? IconChevronDown : IconMinus"
        aria-hidden="true"
      />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { IconChevronDown, IconChevronUp, IconMinus, IconPlus } from '@maple-design/icons-vue'
import { createNamespace } from '../utils/components'
import type { StepMethod } from './number-arithmetic'

const props = defineProps<{ method: StepMethod; disabled: boolean; compact?: boolean; label: string }>()
const emit = defineEmits<{ step: [method: StepMethod, event: Event, repeat: boolean]; stop: [] }>()
const { n } = createNamespace('input-number')
function start(event: PointerEvent) {
  if (props.disabled || event.button !== 0 || event.isPrimary === false) {
    return
  }
  event.preventDefault()
  emit('step', props.method, event, true)
}
function click(event: MouseEvent) {
  // detail=0 is keyboard / assistive activation, not the click following a pointer press.
  if (!props.disabled && event.detail === 0) {
    emit('step', props.method, event, false)
  }
}
</script>
