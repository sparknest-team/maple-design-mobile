<template>
  <component :is="presentations.inline.component" :controller="controller">
    <template #reference>
      <SelectionField
        ref="fieldRef"
        :loading-mode="loadingMode"
        :open-trigger-target="openTriggerTarget"
        :open-trigger-tab-index="searchListMode ? -1 : undefined"
        :show-tags="showTags"
        :separator="separator"
        :text-align="textAlign"
        :hint="mergedHint"
        :line="line"
        :text-color="textColor"
        :focus-color="focusColor"
        :blur-color="blurColor"
        :items="fieldItems"
        :input-value="computedInputValue"
        :disabled="mergedDisabled"
        :readonly="mergedReadonly"
        :error="mergedError"
        :multiple="multiple"
        :clearable="clearable && !loading"
        :searchable="filterable"
        :size="mergedSize"
        :variant="mergedVariant"
        :open="computedOpen"
        :placeholder="placeholder"
        :loading="loading"
        :max-tag-count="maxTagCount"
        :tag-nowrap="tagNowrap"
        :aria-controls="searchListVisible && allowAutomaticOwnership ? searchListId : undefined"
        :aria-haspopup="searchListVisible ? 'listbox' : undefined"
        :aria-activedescendant="searchActiveId"
        v-bind="$attrs"
        @update:input-value="handleInputValueChange"
        @clear="handleClear"
        @focus="handleFocus"
        @blur="handleBlur"
        @remove="handleRemove"
        @keydown="handleFieldKeydown"
      >
        <template v-if="$slots.label" #label="data">
          <slot name="label" v-bind="data" />
        </template>
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix" />
        </template>
        <template v-if="$slots.selected" #selected><slot name="selected" /></template>
        <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
        <template v-if="$slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
        <template v-if="$slots['arrow-icon']" #arrow-icon="scope">
          <slot name="arrow-icon" v-bind="scope" />
        </template>
        <template v-if="$slots['loading-icon']" #loading-icon>
          <slot name="loading-icon" />
        </template>
        <template v-if="$slots['search-icon']" #search-icon>
          <slot name="search-icon" />
        </template>
      </SelectionField>
    </template>
    <CascaderMenu
      :controller="controller"
      :keyboard-handler="handleFieldKeydown"
      :listbox-id="searchListMode ? searchListId : undefined"
    >
      <template v-for="(_, slotName) in $slots" #[slotName]="scope"
        ><slot :name="slotName" v-bind="scope || {}"
      /></template>
    </CascaderMenu>
  </component>
</template>
<script setup lang="ts">
import { computed, nextTick, reactive, ref, toRefs, useAttrs, useId, useSlots } from 'vue'
import SelectionField from '../_components/selection-field/SelectionField.vue'
import { createNamespace } from '../utils/components'
import CascaderMenu from './CascaderMenu.vue'
import { cascaderEmits } from './emits'
import { presentations } from './presentations'
import { cascaderProps } from './props'
import { useCascaderController } from './use-cascader-controller'

defineOptions({ name: createNamespace('cascader').name, inheritAttrs: false })
const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const controller = reactive(useCascaderController(props, { emit, slots: useSlots() }))
const {
  loading,
  fieldItems,
  computedInputValue,
  mergedDisabled,
  mergedReadonly,
  mergedError,
  mergedSize,
  mergedVariant,
  mergedHint,
  computedOpen,
  showSearchPanel,
  filteredLeafOptions,
  activeKey,
  handleInputValueChange,
  handleClear,
  handleFocus,
  handleBlur,
  handleRemove,
  handleKeyDown,
} = toRefs(controller)
const attrs = useAttrs()
const searchListId = `cascader-search-list-${useId()}`
const searchListMode = computed(() => !props.multiple && showSearchPanel.value)
const searchListVisible = computed(() => searchListMode.value && computedOpen.value)
const allowAutomaticOwnership = computed(() => attrs['aria-haspopup'] == null || attrs['aria-haspopup'] === 'listbox')
const searchActiveId = computed(() => {
  if (!searchListVisible.value || loading.value) {
    return undefined
  }
  if (Object.prototype.hasOwnProperty.call(attrs, 'aria-controls') && attrs['aria-controls'] !== searchListId) {
    return undefined
  }
  if (!allowAutomaticOwnership.value) {
    return undefined
  }
  const index = filteredLeafOptions.value.findIndex((item) => item.key === activeKey.value && !item.disabled)
  return index < 0 ? undefined : `${searchListId}-option-${index}`
})
const handleFieldKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
  if (!event.defaultPrevented) {
    const target = event.target as HTMLElement | null
    const restore =
      event.key === 'Escape' &&
      !event.isComposing &&
      event.keyCode !== 229 &&
      computedOpen.value &&
      target?.matches('[data-cascader-key]') &&
      target.ownerDocument.activeElement === target
    const task = handleKeyDown.value(event)
    if (restore && target) {
      nextTick(() => {
        const active = target.ownerDocument.activeElement
        if (
          !computedOpen.value &&
          (active === target || (!target.isConnected && active === target.ownerDocument.body))
        ) {
          fieldRef.value?.focus()
        }
      })
    }
    return task
  }
}
const fieldRef = ref<InstanceType<typeof SelectionField>>()
defineExpose({ refresh: controller.refresh, focus: () => fieldRef.value?.focus(), blur: () => fieldRef.value?.blur() })
</script>
