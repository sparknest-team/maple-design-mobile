<template>
  <Tooltip v-bind="tooltipBindings">
    <div
      v-bind="$attrs"
      :class="
        classes(n(), [clamp, n('--clamp'), n('--line')], [expandEnabled, n('--cursor')], [expanding, n('--expand')])
      "
      :style="rootStyles"
      :role="expandEnabled ? 'button' : undefined"
      :tabindex="expandEnabled || tooltip !== false ? 0 : undefined"
      :aria-expanded="expandEnabled ? expanding : undefined"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span><slot /></span>
    </div>
    <template #content>
      <slot name="tooltip-content">
        <span v-if="tooltipBindings.content !== undefined">{{ tooltipBindings.content }}</span>
        <slot v-else />
      </slot>
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue'
import Tooltip, { type TooltipProps } from '../tooltip'
import { createNamespace } from '../utils/components'
import { ellipsisProps } from './props'

defineOptions({ name: createNamespace('ellipsis').name, inheritAttrs: false })
const props = defineProps(ellipsisProps)
const emit = defineEmits<{ 'update:expand': [expand: boolean] }>()
const { n, classes } = createNamespace('ellipsis')
const expandEnabled = computed(() => props.expandTrigger === 'click')
const innerExpand = ref(props.defaultExpand)
const expanding = computed(() => props.expand ?? innerExpand.value)
const clamp = computed(() => {
  const value = Number(props.lineClamp)
  return Number.isFinite(value) && value >= 1 ? Math.floor(value) : undefined
})
const rootStyles = computed<CSSProperties>(() => ({
  WebkitLineClamp: expanding.value ? undefined : clamp.value,
}))
const tooltipBindings = computed<TooltipProps>(() =>
  props.tooltip === false ? { disabled: true, open: false } : props.tooltip === true ? {} : { ...props.tooltip },
)
function toggle() {
  if (!expandEnabled.value) {
    return
  }
  const value = !expanding.value
  if (props.expand === undefined) {
    innerExpand.value = value
  }
  emit('update:expand', value)
}
function handleKeydown(event: KeyboardEvent) {
  if (!expandEnabled.value || event.target !== event.currentTarget || !['Enter', ' '].includes(event.key)) {
    return
  }
  event.preventDefault()
  toggle()
}
</script>
