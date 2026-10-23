<template>
  <div :class="n()">
    <nav :class="n('path')" :aria-label="texts.select.value">
      <button
        v-for="(column, index) in displayColumns"
        :key="index"
        type="button"
        :class="classes(n('step'), [activeLevel === index, n('step--active')])"
        :aria-current="activeLevel === index ? 'step' : undefined"
        @click="activeLevel = index"
      >
        <span :class="n('number')">{{ index + 1 }}</span>
        {{ column.find((option) => option.key === selectedPath[index])?.label || texts.select.value }}
      </button>
    </nav>
    <div :class="n('columns')">
      <div v-if="loading" :class="n('empty')"><Loading /></div>
      <div v-else-if="!displayColumns.length" :class="n('empty')">
        <slot name="empty"><Empty /></slot>
      </div>
      <template v-else>
        <CascaderColumn
          v-for="(column, index) in displayColumns"
          v-show="!mobile || index === activeLevel"
          :key="index"
          :column="column"
          :level="index"
          :selected-path="selectedPath"
          :active-key="activeKey"
          :total-level="totalLevel"
          :multiple="multiple"
          :check-strictly="checkStrictly"
          :virtual-list-props="virtualListProps"
        >
          <template v-if="$slots.empty" #empty><slot name="empty" /></template>
        </CascaderColumn>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { useFieldTexts } from '../_components/field-presentation/texts'
import { selectionEditorSurface } from '../_components/selected-options/context'
import type { VirtualListProps } from '../_components/virtual-list-v2/interface'
import Empty from '../empty'
import Loading from '../loading'
import { createNamespace } from '../utils/components'
import CascaderColumn from './cascader-column'
import type { CascaderOptionInfo } from './types'

defineOptions({ name: createNamespace('cascader-editor-panel').name })
const props = defineProps<{
  displayColumns: CascaderOptionInfo[][]
  selectedPath: string[]
  activeKey?: string
  totalLevel: number
  multiple?: boolean
  checkStrictly?: boolean
  loading?: boolean
  virtualListProps?: VirtualListProps
}>()
const { n, classes } = createNamespace('cascader-editor-panel')
const { mobile } = inject(selectionEditorSurface, { mobile: false })
const texts = useFieldTexts()
const activeLevel = ref(0)
watch(
  () => [props.selectedPath, props.displayColumns.length],
  () => {
    activeLevel.value = Math.max(0, Math.min(props.selectedPath.length, props.displayColumns.length - 1))
  },
  { deep: true, immediate: true },
)
</script>
