<script lang="ts" setup>
import { computed, provide, reactive, toRefs, watchEffect } from 'vue'
import { createNamespace } from '../utils/components'
import { GRID_CONTEXT_KEY, GRID_DATA_COLLECTOR_KEY } from './context'
import { useResponsiveState } from './hook/use-responsive-state'
import { gridProps } from './props'
import type { GridItemData } from './types'
import { setItemVisible } from './utils'

defineOptions({
  name: createNamespace('grid').name,
})

const { n } = createNamespace('grid')

const props = defineProps(gridProps)
const { cols: propCols, rowGap: propRowGap, colGap: propColGap, collapsedRows, collapsed } = toRefs(props)

const cols = useResponsiveState(propCols, 24)
const colGap = useResponsiveState(propColGap, 0)
const rowGap = useResponsiveState(propRowGap, 0)

const style = computed(() => [
  {
    gap: `${rowGap.value}px ${colGap.value}px`,
    'grid-template-columns': `repeat(${cols.value}, minmax(0px, 1fr))`,
  },
])

const itemDataMap = reactive<Map<number, GridItemData>>(new Map())
const itemDataList = computed(() => {
  const list: GridItemData[] = []
  for (const [index, itemData] of itemDataMap.entries()) {
    list[index] = itemData
  }
  return list
})

const gridContext = reactive<{
  overflow: boolean
  displayIndexList: number[]
  cols: number
  colGap: number
}>({
  overflow: false,
  displayIndexList: [],
  cols: cols.value,
  colGap: colGap.value,
})

watchEffect(() => {
  gridContext.cols = cols.value
  gridContext.colGap = colGap.value
})

watchEffect(() => {
  const displayInfo = setItemVisible({
    cols: cols.value,
    collapsed: collapsed.value,
    collapsedRows: collapsedRows.value,
    itemDataList: itemDataList.value,
  })
  gridContext.overflow = displayInfo.overflow
  gridContext.displayIndexList = displayInfo.displayIndexList
})

provide(GRID_CONTEXT_KEY, gridContext)
provide(GRID_DATA_COLLECTOR_KEY, {
  collectItemData(index, itemData) {
    itemDataMap.set(index, itemData)
  },
  removeItemData(index) {
    itemDataMap.delete(index)
  },
})
</script>

<template>
  <div :class="n()" :style="style">
    <slot />
  </div>
</template>

<style lang="less">
@import '../styles/common';
@import './grid';
</style>
