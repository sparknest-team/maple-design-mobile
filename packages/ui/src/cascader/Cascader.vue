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
          ((searchListVisible && allowAutomaticOwnership) || dialogVisible) && samePopupRoot ? searchListId : undefined
        "
        :aria-haspopup="dialogMode ? 'dialog' : searchListVisible ? 'listbox' : undefined"
        :aria-activedescendant="samePopupRoot ? searchActiveId : undefined"
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
      ref="menuRef"
      :controller="controller"
      :focus-fallback="() => fieldRef?.focus()"
      :keyboard-handler="handleFieldKeydown"
      :listbox-id="searchListMode ? searchListId : undefined"
      :dialog-id="dialogMode ? searchListId : undefined"
      :report-popup-element="reportPopupElement"
    >
      <template v-for="(_, slotName) in $slots" #[slotName]="scope"
        ><slot :name="slotName" v-bind="scope || {}"
      /></template>
    </CascaderMenu>
  </component>
</template>
<script setup lang="ts">
import {
  computed,
  nextTick,
  onActivated,
  onDeactivated,
  reactive,
  ref,
  toRefs,
  useAttrs,
  useSlots,
  watch,
  watchPostEffect,
} from 'vue'
import SelectionField from '../_components/selection-field/SelectionField.vue'
import { isShadowRoot } from '../_utils/is-shadow-root'
import { createNamespace, getPrefixCls } from '../utils/components'
import { useId } from '../utils/vue-compat'
import CascaderMenu from './CascaderMenu.vue'
import { watchDetachedRoots } from './detached-root-monitor'
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
const dialogMode = computed(
  () =>
    (!showSearchPanel.value || props.multiple) &&
    (attrs['aria-haspopup'] == null || attrs['aria-haspopup'] === 'dialog') &&
    attrs['aria-controls'] == null,
)
const dialogVisible = computed(() => dialogMode.value && computedOpen.value)
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
const fieldRef = ref<InstanceType<typeof SelectionField>>()
const menuRef = ref<InstanceType<typeof CascaderMenu>>()
const searchPopup = ref<HTMLElement | null>(null)
const popupElement = computed(() =>
  showSearchPanel.value ? searchPopup.value : dialogMode.value ? (menuRef.value?.hierarchyElement ?? null) : null,
)
// SSR can establish the root relationship only when the popup renders inline.
const samePopupRoot = ref((props.popupContainer ?? props.triggerProps?.popupContainer) === false)
const ownershipActive = ref(true)
onActivated(() => {
  ownershipActive.value = true
})
onDeactivated(() => {
  ownershipActive.value = false
  samePopupRoot.value = false
})
const reportPopupElement = (element: HTMLElement | null) => {
  searchPopup.value = element
}
watch(
  [popupElement, () => props.popupContainer, () => fieldRef.value?.inputRef, ownershipActive, computedOpen],
  async (_, __, onCleanup) => {
    let cancelled = false
    let observer: MutationObserver | undefined
    let stopDetachedCheck: (() => void) | undefined
    onCleanup(() => {
      cancelled = true
      observer?.disconnect()
      stopDetachedCheck?.()
    })
    if (!ownershipActive.value || !computedOpen.value) {
      samePopupRoot.value = false
      return
    }
    await nextTick()
    if (cancelled) {
      return
    }
    let trackedNodes = new Set<Node>()
    const update = () => {
      if (cancelled) {
        return
      }
      const input = fieldRef.value?.inputRef
      const popup = popupElement.value
      samePopupRoot.value = !!input && !!popup && input.getRootNode() === popup.getRootNode()
      observer?.disconnect()
      stopDetachedCheck?.()
      stopDetachedCheck = undefined
      if (!observer || !input || !popup) {
        return
      }
      const parents = new Set<Node>()
      const nodes = new Set<Node>()
      for (const element of [input, popup]) {
        let node: Node | null = element
        while (node) {
          nodes.add(node)
          const parent: Node | null = node.parentNode ?? (isShadowRoot(node) ? node.host : null)
          if (parent) {
            parents.add(parent)
          }
          node = parent
        }
      }
      trackedNodes = nodes
      for (const parent of parents) {
        observer.observe(parent, { childList: true })
      }
      if (!input.isConnected || !popup.isConnected) {
        for (const root of new Set([input.getRootNode(), popup.getRootNode()])) {
          observer.observe(root, { childList: true, subtree: true })
        }
      }
      if (!input.isConnected && !popup.isConnected) {
        stopDetachedCheck = watchDetachedRoots(() => {
          if (input.isConnected || popup.isConnected) {
            update()
          }
        })
      }
    }
    const Observer = fieldRef.value?.inputRef?.ownerDocument.defaultView?.MutationObserver
    if (Observer) {
      observer = new Observer((records) => {
        const input = fieldRef.value?.inputRef
        const popup = popupElement.value
        if (
          records.some((record) =>
            [...Array.from(record.addedNodes), ...Array.from(record.removedNodes)].some(
              (node) =>
                trackedNodes.has(node) || (!!input && node.contains(input)) || (!!popup && node.contains(popup)),
            ),
          )
        ) {
          update()
        }
      })
    }
    update()
  },
  { flush: 'post' },
)
// Element references can reach a popup in an ancestor tree (for example, body).
// The browser enforces shadow scope, including when either node moves.
watchPostEffect((onCleanup) => {
  const input = fieldRef.value?.inputRef
  const popup = popupElement.value
  if (
    !input ||
    !popup ||
    samePopupRoot.value ||
    !ownershipActive.value ||
    !(dialogVisible.value || (searchListVisible.value && allowAutomaticOwnership.value)) ||
    attrs['aria-controls'] !== undefined ||
    !('ariaControlsElements' in input)
  )
    return

  input.ariaControlsElements = [popup]
  const id = searchActiveId.value
  const root = popup.getRootNode() as Document | ShadowRoot
  const option = id && root.getElementById?.(id)
  const setActive =
    option &&
    popup.contains(option) &&
    attrs['aria-activedescendant'] === undefined &&
    'ariaActiveDescendantElement' in input
  if (setActive) input.ariaActiveDescendantElement = option
  onCleanup(() => {
    // A later Vue render may already have supplied an ID or a caller override.
    if (input.getAttribute('aria-controls') === '' && attrs['aria-controls'] === undefined)
      input.removeAttribute('aria-controls')
    if (setActive && input.getAttribute('aria-activedescendant') === '' && attrs['aria-activedescendant'] === undefined)
      input.removeAttribute('aria-activedescendant')
  })
})
const handleFieldKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
  if (!event.defaultPrevented) {
    const target = event.target as HTMLElement | null
    if (
      dialogVisible.value &&
      !mergedDisabled.value &&
      !mergedReadonly.value &&
      !loading.value &&
      !controller.session.pending &&
      event.key === 'ArrowDown' &&
      !event.isComposing &&
      event.keyCode !== 229 &&
      target === fieldRef.value?.inputRef
    ) {
      const dialog = popupElement.value
      const search = showSearchPanel.value
      const selector = search
        ? `.${getPrefixCls('cascader-option')}-checkbox input[type="checkbox"]:not(:disabled)`
        : '[data-cascader-key][tabindex="0"]:not([aria-disabled="true"])'
      const boundary = search ? `.${getPrefixCls('cascader')}-search-panel` : '[role="dialog"]'
      const entry = Array.from(dialog?.querySelectorAll<HTMLElement>(selector) ?? [])
        .find((item) => item.closest(boundary) === dialog)
      if (entry && (search || target?.matches(':focus'))) {
        event.preventDefault()
        entry.focus()
        return
      }
      if (!search) {
        return handleKeyDown.value(event)
      }
    }
    const dialogItem = dialogVisible.value && showSearchPanel.value ? target?.closest('[data-cascader-key]') : null
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
defineExpose({ refresh: controller.refresh, focus: () => fieldRef.value?.focus(), blur: () => fieldRef.value?.blur() })
</script>
