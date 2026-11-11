<template>
  <div :class="n()" @focusin="onFocusin" @focusout="onFocusout">
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
          :menu-id="menuId(index)"
          :next-menu-id="!mobile && displayColumns[index + 1]?.length ? menuId(index + 1) : undefined"
          :selected-path="selectedPath"
          :active-key="activeKey"
          :focused-key="focusedKey"
          :tab-entry="index === (mobile ? activeLevel : tabEntryLevel)"
          :total-level="totalLevel"
          :displayed-levels="mobile || !displayColumns[index + 1]?.length ? index + 1 : displayColumns.length"
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
import { computed, inject, ref, useId, watch } from 'vue'
import { useFieldTexts } from '../_components/field-presentation/texts'
import { selectionEditorSurface } from '../_components/selected-options/context'
import type { VirtualListProps } from '../_components/virtual-list-v2/interface'
import Empty from '../empty'
import Loading from '../loading/Loading.vue'
import { createNamespace, getPrefixCls } from '../utils/components'
import CascaderColumn from './cascader-column'
import type { CascaderOptionInfo } from './types'
import { useCascaderMenuFocus } from './use-menu-focus'

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
const prefixCls = getPrefixCls('cascader')
const { focusedKey, onFocusin, onFocusout } = useCascaderMenuFocus(`.${prefixCls}-panel, .${prefixCls}-editor-panel`)
const menuBaseId = `cascader-menu-${useId()}`
const menuId = (index: number) => `${menuBaseId}-${index}`
const { mobile } = inject(selectionEditorSurface, { mobile: false })
const texts = useFieldTexts()
const activeLevel = ref(0)
const tabEntryLevel = computed(() => {
  const preferred = focusedKey.value ?? props.activeKey
  const active = props.displayColumns.findIndex((column) => column.some((item) => item.key === preferred))
  return active >= 0 ? active : props.displayColumns.findIndex((column) => column.length > 0)
})
watch(
  () => [props.selectedPath, props.displayColumns.length],
  () => {
    activeLevel.value = Math.max(0, Math.min(props.selectedPath.length, props.displayColumns.length - 1))
  },
  { deep: true, immediate: true },
)
</script>
