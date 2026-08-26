<script lang="ts" setup>
import { computed, inject, onUnmounted, ref, toRefs, watchEffect } from 'vue'
import { GRID_CONTEXT_KEY, GRID_DATA_COLLECTOR_KEY } from '../grid/context'
import { useIndex } from '../grid/hook/use-index'
import { useResponsiveState } from '../grid/hook/use-responsive-state'
import { resolveItemData } from '../grid/utils'
import { createNamespace } from '../utils/components'
import { gridItemProps } from './props'

defineOptions({
  name: createNamespace('grid-item').name,
})

const { n } = createNamespace('grid-item')

const props = defineProps(gridItemProps)

const domRef = ref<HTMLElement>()
const { computedIndex } = useIndex({
  itemRef: domRef,
  selector: `.${n()}`,
})

const gridContext = inject(GRID_CONTEXT_KEY, {
  overflow: false,
  displayIndexList: [],
  cols: 24,
  colGap: 0,
})
const gridDataCollector = inject(GRID_DATA_COLLECTOR_KEY)

const visible = computed(() => gridContext?.displayIndexList?.includes(computedIndex.value))
const { span: propSpan, offset: propOffset } = toRefs(props)
const rSpan = useResponsiveState(propSpan, 1)
const rOffset = useResponsiveState(propOffset, 0)

const itemData = computed(() =>
  resolveItemData(gridContext.cols, {
    ...props,
    span: rSpan.value,
    offset: rOffset.value,
  }),
)

const offsetStyle = computed(() => {
  const { offset, span } = itemData.value
  const { colGap } = gridContext
  if (offset > 0) {
    const oneSpan = `(100% - ${colGap * (span - 1)}px) / ${span}`
    return {
      'margin-left': `calc((${oneSpan} * ${offset}) + ${colGap * offset}px)`,
    }
  }
  return {}
})

const columnStart = computed(() => {
  const { suffix, span } = itemData.value
  const { cols } = gridContext
  if (suffix) {
    return `${cols - span + 1}`
  }
  return `span ${span}`
})

const style = computed(() => {
  const { span } = itemData.value
  if (domRef.value) {
    return [
      {
        'grid-column': `${columnStart.value} / span ${span}`,
      },
      offsetStyle.value,
      !visible.value || span === 0 ? { display: 'none' } : {},
    ]
  }
  return []
})

const overflow = computed(() => gridContext.overflow)

watchEffect(() => {
  if (computedIndex.value !== -1) {
    gridDataCollector?.collectItemData(computedIndex.value, itemData.value)
  }
})

onUnmounted(() => {
  if (computedIndex.value !== -1) {
    gridDataCollector?.removeItemData(computedIndex.value)
  }
})
</script>

<template>
  <div ref="domRef" :class="n()" :style="style">
    <slot :overflow="overflow ?? false" />
  </div>
</template>

<style lang="less">
@import '../styles/common';
</style>
