<script setup lang="ts">
import { computed, inject } from 'vue'
import { ROW_CONTEXT_KEY } from '../row/context'
import { createNamespace } from '../utils/components'
import { colProps, type ColBreakpoint } from './props'

defineOptions({ name: createNamespace('col').name })
const props = defineProps(colProps)
const emit = defineEmits<{ (event: 'click', value: MouseEvent): void }>()
const { n } = createNamespace('col')
const row = inject(ROW_CONTEXT_KEY, undefined)
const isDiv = computed(() => row?.div.value ?? false)
const flex = computed(() => {
  if (props.flex === undefined) {
    return undefined
  }
  if (typeof props.flex === 'number') {
    return Number.isFinite(props.flex) ? `${props.flex} 1 0%` : undefined
  }
  if (/^\d*\.?\d+(px|em|rem|%|vw|vh)$/.test(props.flex)) {
    return `0 0 ${props.flex}`
  }
  // CSS validates keywords, flex shorthand, calc() and variable expressions.
  return props.flex
})
const classNames = computed(() => {
  if (isDiv.value) {
    return []
  }
  const result = [n()]
  if (flex.value !== undefined) {
    return result
  }
  result.push(n(`--span-${props.span}`))
  if (props.offset !== undefined) {
    result.push(n(`--offset-${props.offset}`))
  }
  if (props.order !== undefined) {
    result.push(n(`--order-${props.order}`))
  }
  for (const point of ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const) {
    const value: ColBreakpoint | undefined = props[point]
    const config = typeof value === 'number' ? { span: value } : value
    for (const key of ['span', 'offset', 'order'] as const) {
      if (config?.[key] !== undefined) {
        result.push(n(`--${key}-${point}-${config[key]}`))
      }
    }
  }
  return result
})
const style = computed(() => {
  if (isDiv.value) {
    return undefined
  }
  const [x, y] = row?.gutter.value ?? [0, 0]
  return {
    flex: flex.value,
    paddingLeft: x ? `${x / 2}px` : undefined,
    paddingRight: x ? `${x / 2}px` : undefined,
    paddingTop: y ? `${y / 2}px` : undefined,
    paddingBottom: y ? `${y / 2}px` : undefined,
  }
})
</script>
<template>
  <div :class="classNames" :style="style" @click="emit('click', $event)"><slot /></div>
</template>
