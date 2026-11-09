<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onUpdated, ref } from 'vue'
import { createNamespace } from '../utils/components'
import { GRID_CONTEXT_KEY } from './context'
import { useResponsiveState } from './hook/use-responsive-state'
import { gridItemProps } from './item-props'
import { resolveItemData } from './utils'
import { normalizeGridResponsive } from './validation'

defineOptions({ name: createNamespace('grid-item').name })
const props = defineProps(gridItemProps)
const { n } = createNamespace('grid-item')
const grid = inject(GRID_CONTEXT_KEY, undefined)
const element = ref<HTMLElement>()
const id = Symbol('grid-item')
const span = useResponsiveState(
  computed(() => normalizeGridResponsive(props.span, 1)),
  1,
)
const offset = useResponsiveState(
  computed(() => normalizeGridResponsive(props.offset, 0)),
  0,
)
const data = computed(() =>
  resolveItemData(grid?.cols.value ?? 24, { span: span.value, offset: offset.value, suffix: props.suffix }),
)
grid?.register({ id, data, element })
onBeforeUnmount(() => grid?.remove(id))
onUpdated(() => grid?.reorder())
const overflow = computed(() => grid?.overflow.value ?? false)
const style = computed(() => {
  const { span, offset, suffix } = data.value
  const cols = grid?.cols.value ?? 24,
    gap = grid?.colGap.value ?? 0
  return {
    gridColumn: span === 0 ? undefined : `${suffix ? cols - span + 1 : `span ${span}`} / span ${span}`,
    marginInlineStart:
      offset && span ? `calc(((100% - ${gap * (span - 1)}px) / ${span} * ${offset}) + ${gap * offset}px)` : undefined,
    display: span === 0 || (grid && !grid.visible(id)) ? 'none' : undefined,
  }
})
</script>
<template>
  <div ref="element" :class="n()" :style="style"><slot :overflow="overflow" /></div>
</template>
