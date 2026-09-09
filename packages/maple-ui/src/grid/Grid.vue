<script setup lang="ts">
import { computed, onMounted, onUpdated, provide, ref, shallowRef } from 'vue'
import { createNamespace } from '../utils/components'
import { GRID_CONTEXT_KEY, type GridRecord } from './context'
import { useResponsiveState } from './hook/use-responsive-state'
import { gridProps } from './props'
import { setItemVisible } from './utils'

defineOptions({ name: createNamespace('grid').name })
const props = defineProps(gridProps)
const { n } = createNamespace('grid')
const rawCols = useResponsiveState(
  computed(() => props.cols),
  24,
)
const cols = computed(() => Math.max(1, Math.floor(rawCols.value) || 1))
const rawColGap = useResponsiveState(
  computed(() => props.colGap),
  0,
)
const rawRowGap = useResponsiveState(
  computed(() => props.rowGap),
  0,
)
const colGap = computed(() => Math.max(0, rawColGap.value))
const records = shallowRef<GridRecord[]>([])
const mounted = ref(false)
const layout = computed(() =>
  setItemVisible({
    cols: cols.value,
    collapsed: props.collapsed,
    collapsedRows: props.collapsedRows,
    itemDataList: records.value.map((record) => record.data.value),
  }),
)
const reorder = () => {
  const sorted = [...records.value].sort((a, b) => {
    if (!a.element.value || !b.element.value) {
      return 0
    }
    const position = a.element.value.compareDocumentPosition(b.element.value)
    return position & 4 ? -1 : position & 2 ? 1 : 0
  })
  if (sorted.some((record, i) => record !== records.value[i])) {
    records.value = sorted
  }
}
provide(GRID_CONTEXT_KEY, {
  cols,
  colGap,
  overflow: computed(() => layout.value.overflow),
  visible: (id) =>
    !mounted.value || layout.value.displayIndexList.includes(records.value.findIndex((record) => record.id === id)),
  register: (record) => {
    records.value = [...records.value, record]
  },
  remove: (id) => {
    records.value = records.value.filter((record) => record.id !== id)
  },
  reorder,
})
onMounted(() => {
  reorder()
  mounted.value = true
})
onUpdated(reorder)
const style = computed(() => ({
  gap: `${Math.max(0, rawRowGap.value)}px ${colGap.value}px`,
  gridTemplateColumns: `repeat(${cols.value}, minmax(0px, 1fr))`,
}))
</script>
<template>
  <div :class="n()" :style="style"><slot /></div>
</template>
