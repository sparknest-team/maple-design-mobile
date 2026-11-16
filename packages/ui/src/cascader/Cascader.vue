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
        :aria-controls="
          (searchListVisible && allowAutomaticOwnership) || (multipleDialogVisible && sameDialogRoot)
            ? searchListId
            : undefined
        "
        :aria-haspopup="multipleDialogMode ? 'dialog' : searchListVisible ? 'listbox' : undefined"
        :aria-activedescendant="searchActiveId"
        v-bind="forwardedAttrs()"
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
      :focus-fallback="() => fieldRef?.focus()"
      :keyboard-handler="handleFieldKeydown"
      :listbox-id="searchListMode ? searchListId : undefined"
      :multiple-dialog-id="multipleDialogMode ? searchListId : undefined"
      :report-dialog-element="reportDialogElement"
    >
      <template v-for="(_, slotName) in $slots" #[slotName]="scope"
        ><slot :name="slotName" v-bind="scope || {}"
      /></template>
    </CascaderMenu>
  </component>
</template>
<script setup lang="ts">
import { computed, nextTick, reactive, ref, toRefs, useAttrs, useSlots, watch } from 'vue'
import SelectionField from '../_components/selection-field/SelectionField.vue'
import { createNamespace, getPrefixCls } from '../utils/components'
import { useId } from '../utils/vue-compat'
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
const forwardedAttrs = () => {
  const result = { ...attrs }
  for (const key of ['aria-haspopup', 'aria-controls', 'aria-activedescendant']) {
    if (result[key] === undefined) {
      delete result[key]
    }
  }
  return result
}
const searchListId = `cascader-search-list-${useId()}`
const multipleDialogMode = computed(
  () =>
    props.multiple &&
    showSearchPanel.value &&
    (attrs['aria-haspopup'] == null || attrs['aria-haspopup'] === 'dialog') &&
    attrs['aria-controls'] == null,
)
const multipleDialogVisible = computed(() => multipleDialogMode.value && computedOpen.value)
const searchListMode = computed(() => !props.multiple && showSearchPanel.value)
const searchListVisible = computed(() => searchListMode.value && computedOpen.value)
const allowAutomaticOwnership = computed(() => attrs['aria-haspopup'] == null || attrs['aria-haspopup'] === 'listbox')
const searchActiveId = computed(() => {
  if (!searchListVisible.value || loading.value) {
    return undefined
  }
  if (attrs['aria-controls'] !== undefined && attrs['aria-controls'] !== searchListId) {
    return undefined
  }
  if (!allowAutomaticOwnership.value) {
    return undefined
  }
  const index = filteredLeafOptions.value.findIndex((item) => item.key === activeKey.value && !item.disabled)
  return index < 0 ? undefined : `${searchListId}-option-${index}`
})
const dialogElement = ref<HTMLElement | null>(null)
const sameDialogRoot = ref(true)
const reportDialogElement = (element: HTMLElement | null) => {
  dialogElement.value = element
}
watch(
  [dialogElement, () => props.popupContainer],
  async () => {
    await nextTick()
    const input = fieldRef.value?.inputRef
    sameDialogRoot.value = !input || !dialogElement.value || input.getRootNode() === dialogElement.value.getRootNode()
  },
  { flush: 'post' },
)
const handleFieldKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
  if (!event.defaultPrevented) {
    const target = event.target as HTMLElement | null
    if (
      multipleDialogVisible.value &&
      !mergedDisabled.value &&
      !mergedReadonly.value &&
      !loading.value &&
      !controller.session.pending &&
      event.key === 'ArrowDown' &&
      !event.isComposing &&
      event.keyCode !== 229 &&
      target?.matches('input[role="combobox"]')
    ) {
      const dialog = dialogElement.value
      const checkbox = dialog?.querySelector<HTMLInputElement>('input[type="checkbox"]:not(:disabled)')
      if (checkbox) {
        event.preventDefault()
        checkbox.focus()
        return
      }
    }
    const dialogItem = multipleDialogVisible.value ? target?.closest('[data-cascader-key]') : null
    if (dialogItem && target !== dialogItem && event.key !== 'Escape') {
      return
    }
    const root = target?.getRootNode()
    const focusRoot = root && 'activeElement' in root ? (root as Document | ShadowRoot) : target?.ownerDocument
    const option = target?.closest('[data-cascader-key]')
    const internalCheckbox =
      target?.matches('input[type="checkbox"]') &&
      option &&
      Array.from(option.children).some(
        (child) => child.classList.contains(`${getPrefixCls('cascader-option')}-checkbox`) && child.contains(target),
      )
    const restore =
      event.key === 'Escape' &&
      !event.isComposing &&
      event.keyCode !== 229 &&
      computedOpen.value &&
      (target === option || internalCheckbox) &&
      focusRoot?.activeElement === target
    const task = handleKeyDown.value(event)
    if (restore && target) {
      const restoreFocus = () =>
        nextTick(() => {
          const active = focusRoot?.activeElement
          const document = target.ownerDocument
          const lostToRemoval =
            !target.isConnected &&
            (active === null || active === document.body || active === document.documentElement) &&
            (document.activeElement === document.body || document.activeElement === document.documentElement)
          if (!computedOpen.value && (active === target || lostToRemoval)) {
            fieldRef.value?.focus()
          }
        })
      // The trigger's document-level Escape listener closes the popup later in the same event.
      if (internalCheckbox && target.ownerDocument.defaultView) {
        target.ownerDocument.defaultView.setTimeout(restoreFocus, 0)
      } else {
        void restoreFocus()
      }
    }
    return task
  }
}
const fieldRef = ref<InstanceType<typeof SelectionField>>()
defineExpose({ refresh: controller.refresh, focus: () => fieldRef.value?.focus(), blur: () => fieldRef.value?.blur() })
</script>
