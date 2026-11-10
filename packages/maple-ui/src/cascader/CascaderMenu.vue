<template>
  <SelectedOptions
    :open="controller.computedOpen"
    :multiple="multiple"
    :items="controller.fieldItems"
    :disabled="
      controller.mergedDisabled || controller.mergedReadonly || controller.loading || controller.session.pending
    "
    @remove="controller.handleRemove"
    @clear="controller.clearSelection"
  >
    <Input
      v-if="searchable"
      :model-value="controller.computedInputValue"
      edit-mode="direct"
      :disabled="controller.mergedDisabled"
      :readonly="controller.mergedReadonly"
      :hint="false"
      :variant="editor ? 'outline' : undefined"
      :aria-label="texts.search.value"
      :aria-controls="optionsId"
      :placeholder="texts.search.value"
      clearable
      @update:model-value="controller.handleInputValueChange"
    />
    <cascader-search-panel
      v-if="showSearchPanel"
      :id="optionsId"
      :options="filteredLeafOptions"
      :active-key="activeKey"
      :multiple="multiple"
      :check-strictly="checkStrictly"
      :loading="loading"
      :path-label="!searchOptionOnlyLabel"
      :listbox-id="listboxId"
      :listbox-label="texts.search.value"
      v-on="keyboardHandler ? { keydown: keyboardHandler } : {}"
    >
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </cascader-search-panel>
    <component
      :is="editor ? CascaderEditorPanel : BaseCascaderPanel"
      v-else
      :id="optionsId"
      :display-columns="displayColumns"
      :selected-path="selectedPath"
      :active-key="activeKey"
      :multiple="multiple"
      :total-level="totalLevel"
      :check-strictly="checkStrictly"
      :loading="loading"
      :virtual-list-props="virtualListProps"
      dropdown
      v-on="keyboardHandler ? { keydown: keyboardHandler } : {}"
    >
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </component>
  </SelectedOptions>
</template>
<script setup lang="ts">
import { inject, toRefs, useId, type UnwrapNestedRefs } from 'vue'
import { isolateEditorForm } from '../_components/field-presentation/form-bridge'
import { useFieldTexts } from '../_components/field-presentation/texts'
import { selectionEditorSurface } from '../_components/selected-options/context'
import SelectedOptions from '../_components/selected-options/SelectedOptions.vue'
import { provideFormErrorDescriptionBoundary } from '../form/error-description'
import Input from '../input'
import { createNamespace } from '../utils/components'
import BaseCascaderPanel from './base-cascader-panel'
import CascaderSearchPanel from './cascader-search-panel'
import CascaderEditorPanel from './CascaderEditorPanel.vue'
import type { CascaderController } from './use-cascader-controller'

defineOptions({ name: createNamespace('cascader-menu').name })
isolateEditorForm()
provideFormErrorDescriptionBoundary()
const texts = useFieldTexts()
const optionsId = `cascader-editor-options-${useId()}`
const editor = inject(selectionEditorSurface, undefined)
const { controller, keyboardHandler, listboxId } = defineProps<{
  controller: UnwrapNestedRefs<CascaderController>
  listboxId?: string
  searchable?: boolean
  keyboardHandler?: (event: KeyboardEvent) => void | Promise<void>
}>()
const { loading, showSearchPanel, filteredLeafOptions, activeKey, displayColumns, selectedPath, totalLevel } =
  toRefs(controller)
const { multiple, checkStrictly, searchOptionOnlyLabel, virtualListProps } = toRefs(controller.props)
</script>
