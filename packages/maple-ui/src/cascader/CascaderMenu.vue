<template>
  <cascader-search-panel
    v-if="showSearchPanel"
    :options="filteredLeafOptions"
    :active-key="activeKey"
    :multiple="multiple"
    :check-strictly="checkStrictly"
    :loading="loading"
    :path-label="!searchOptionOnlyLabel"
  >
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </cascader-search-panel>
  <base-cascader-panel
    v-else
    :display-columns="displayColumns"
    :selected-path="selectedPath"
    :active-key="activeKey"
    :multiple="multiple"
    :total-level="totalLevel"
    :check-strictly="checkStrictly"
    :loading="loading"
    :virtual-list-props="virtualListProps"
    dropdown
  >
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </base-cascader-panel>
</template>
<script setup lang="ts">
import { toRefs, type UnwrapNestedRefs } from 'vue'
import { createNamespace } from '../utils/components'
import BaseCascaderPanel from './base-cascader-panel'
import CascaderSearchPanel from './cascader-search-panel'
import type { CascaderController } from './use-cascader-controller'

defineOptions({ name: createNamespace('cascader-menu').name })
const { controller } = defineProps<{ controller: UnwrapNestedRefs<CascaderController> }>()
const { showSearchPanel, filteredLeafOptions, activeKey, displayColumns, selectedPath, totalLevel } = toRefs(controller)
const { multiple, checkStrictly, loading, searchOptionOnlyLabel, virtualListProps } = toRefs(controller.props)
</script>
