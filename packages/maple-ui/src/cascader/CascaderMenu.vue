<template>
  <SelectedOptions
    :open="controller.computedOpen"
    :multiple="multiple"
    :items="controller.fieldItems"
    :disabled="controller.mergedDisabled || controller.mergedReadonly"
    @remove="controller.handleRemove"
    @clear="controller.clearSelection"
  >
    <Input
      v-if="searchable"
      :model-value="controller.computedInputValue"
      presentation="inline"
      :disabled="controller.mergedDisabled"
      :readonly="controller.mergedReadonly"
      :hint="false"
      :variant="editor ? 'outline' : undefined"
      :aria-label="texts.search.value"
      :placeholder="texts.search.value"
      clearable
      @update:model-value="controller.handleInputValueChange"
    />
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
    <component
      :is="editor ? CascaderEditorPanel : BaseCascaderPanel"
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
    </component>
  </SelectedOptions>
</template>
<script setup lang="ts">
import { inject, toRefs, type UnwrapNestedRefs } from 'vue'
import { useFieldTexts } from '../_components/field-presentation/texts'
import { selectionEditorSurface } from '../_components/selected-options/context'
import SelectedOptions from '../_components/selected-options/SelectedOptions.vue'
import Input from '../input'
import { createNamespace } from '../utils/components'
import BaseCascaderPanel from './base-cascader-panel'
import CascaderSearchPanel from './cascader-search-panel'
import CascaderEditorPanel from './CascaderEditorPanel.vue'
import type { CascaderController } from './use-cascader-controller'

defineOptions({ name: createNamespace('cascader-menu').name })
const texts = useFieldTexts()
const editor = inject(selectionEditorSurface, undefined)
const { controller } = defineProps<{ controller: UnwrapNestedRefs<CascaderController>; searchable?: boolean }>()
const { showSearchPanel, filteredLeafOptions, activeKey, displayColumns, selectedPath, totalLevel } = toRefs(controller)
const { multiple, checkStrictly, loading, searchOptionOnlyLabel, virtualListProps } = toRefs(controller.props)
</script>
