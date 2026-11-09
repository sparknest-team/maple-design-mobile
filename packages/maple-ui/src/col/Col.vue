<script setup lang="ts">
import { computed, inject } from 'vue'
import { ROW_CONTEXT_KEY } from '../row/context'
import { createNamespace } from '../utils/components'
import { colProps } from './props'
import { colBreakpoints, formatColOrder, isColCount, isColFlex, isColOrder, normalizeColBreakpoint } from './validation'

defineOptions({ name: createNamespace('col').name })
const props = defineProps(colProps)
const emit = defineEmits<{ (event: 'click', value: MouseEvent): void }>()
const { n } = createNamespace('col')
const row = inject(ROW_CONTEXT_KEY, undefined)
const isDiv = computed(() => row?.div.value ?? false)
const flex = computed(() => {
  if (!isColFlex(props.flex)) {
    return undefined
  }
  if (typeof props.flex === 'number') {
    return `${props.flex} 1 0%`
  }
  const value = props.flex as string
  return /^\d*\.?\d+(px|em|rem|%|vw|vh)$/.test(value) ? `0 0 ${value}` : value
})
const classNames = computed(() => {
  if (isDiv.value) {
    return []
  }
  const result = [n(), n(`--span-${isColCount(props.span) ? props.span : 24}`)]
  if (isColCount(props.offset)) {
    result.push(n(`--offset-${props.offset}`))
  }
  if (isColOrder(props.order)) {
    result.push(n('--order'))
  }
  for (const point of colBreakpoints) {
    const config = normalizeColBreakpoint(props[point])
    if (config.span !== undefined) {
      result.push(n(`--span-${point}-${config.span}`))
    }
    if (config.offset !== undefined) {
      result.push(n(`--offset-${point}-${config.offset}`))
    }
    if (config.order !== undefined) {
      result.push(n(`--order-${point}`))
    }
  }
  return result
})

const style = computed(() => {
  if (isDiv.value) {
    return undefined
  }
  const [x, y] = row?.gutter.value ?? [0, 0]
  // Per-instance order values are runtime layout bindings, not theme tokens.
  const orders: Record<string, string> = {}
  if (isColOrder(props.order)) {
    orders[`--${n()}-order`] = formatColOrder(props.order)
  }
  for (const point of colBreakpoints) {
    const config = normalizeColBreakpoint(props[point])
    if (config.order !== undefined) {
      orders[`--${n()}-order-${point}`] = formatColOrder(config.order)
    }
  }
  return {
    ...orders,
    flex: flex.value,
    width: flex.value !== undefined ? 'auto' : undefined,
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
