<template>
  <div :class="classes(n(), [isActive, n('--active')], [disabled, n('--disable')])">
    <div :class="classes(n('shadow'), formatElevation(elevation, 2))"></div>
    <div
      :id="`${idBase}-header`"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled"
      :aria-expanded="isActive"
      :aria-controls="`${idBase}-panel`"
      :class="classes(n('header'), [!disabled, n('header--cursor-pointer')], n(`header--icon-${expandIconPosition}`))"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <div v-if="mergedShowExpandIcon && expandIconPosition === 'left'" :class="n('header-icon')">
        <slot name="expand-icon" v-bind="expandIconSlotProps">
          <mp-icon v-if="!hasParentExpandIcon" :class="iconFallbackClass">
            <MIconChevronDown />
          </mp-icon>
          <component :is="ParentExpandIcon" v-else />
        </slot>
      </div>
      <div v-if="$slots.title || title" :class="n('header-title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" :class="n('header-extra')" @click.stop>
        <slot name="extra" />
      </div>
      <div v-if="mergedShowExpandIcon && expandIconPosition === 'right'" :class="n('header-icon')">
        <slot name="expand-icon" v-bind="expandIconSlotProps">
          <mp-icon v-if="!hasParentExpandIcon" :class="iconFallbackClass">
            <MIconChevronDown />
          </mp-icon>
          <component :is="ParentExpandIcon" v-else />
        </slot>
      </div>
    </div>
    <div
      v-show="showContent"
      :id="`${idBase}-panel`"
      ref="contentEl"
      role="region"
      :aria-labelledby="`${idBase}-header`"
      :class="n('content')"
      @transitionend="handleTransitionEnd"
      @transitionstart="handleTransitionStart"
    >
      <div v-if="contentMounted" :class="n('content-wrap')">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import { IconChevronDown as MIconChevronDown } from '@maplejs/icons-vue'
import MpIcon from '../icon'
import { createNamespace, formatElevation } from '../utils/components'
import { collapseItemProps } from './item-props'
import { useCollapse } from './item-provide'
import type { CollapseName } from './props'
import { useCollapseTransition } from './useCollapseTransition'

const { name, n, classes } = createNamespace('collapse-item')

export default defineComponent({
  name,
  components: {
    MIconChevronDown,
    MpIcon,
  },
  props: collapseItemProps,
  setup(props) {
    const collapseCtx = useCollapse()
    const itemName = computed(() => props.name as CollapseName)
    const disabledRef = computed(() => props.disabled)
    const isActive = computed(() => unref(collapseCtx.activeNames)?.includes(itemName.value))
    const mergedDestroyOnHide = computed(() => unref(collapseCtx.destroyOnHide) || props.destroyOnHide)
    const mergedShowExpandIcon = computed(() => unref(collapseCtx.showExpandIcon) ?? props.showExpandIcon)
    const expandIconPosition = computed(() => unref(collapseCtx.expandIconPosition) ?? 'left')
    const elevation = computed(() => unref(collapseCtx.elevation))
    const showContent = ref(false)
    const contentEl = ref<HTMLElement | null>(null)
    const contentMounted = ref(mergedDestroyOnHide.value ? isActive.value : true)
    const idBase = computed(() => `${n()}-${String(itemName.value).replace(/[^\w-]/g, '-')}`)
    const expandIconSlotProps = computed(() => ({
      active: isActive.value,
      disabled: props.disabled,
      position: expandIconPosition.value,
    }))
    const hasParentExpandIcon = computed(() => !!collapseCtx.slots?.['expand-icon'])
    const iconFallbackClass = computed(() =>
      classes(n('header-icon'), [isActive.value, n('header-open')], [props.disabled, n('header--disable')]),
    )
    const ParentExpandIcon = defineComponent({
      name: 'ParentExpandIcon',
      setup() {
        return () => collapseCtx.slots?.['expand-icon']?.(expandIconSlotProps.value)
      },
    })

    onMounted(() => {
      collapseCtx.addItem?.({
        name: itemName.value,
        disabled: disabledRef,
      })
    })

    onBeforeUnmount(() => {
      collapseCtx.removeItem?.(itemName.value)
    })

    watch(itemName, (nextName, prevName) => {
      if (prevName !== undefined) {
        collapseCtx.removeItem?.(prevName)
      }
      collapseCtx.addItem?.({
        name: nextName,
        disabled: disabledRef,
      })
    })

    watch(isActive, (active) => {
      if (active) {
        contentMounted.value = true
      }
    })

    const { handleTransitionEnd: onTransitionEnd, handleTransitionStart } = useCollapseTransition({
      contentEl,
      showContent,
      expand: isActive,
    })

    function handleClick(e: Event) {
      if (!props.disabled) {
        collapseCtx.handleClick?.(itemName.value, e)
      }
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(event)
      }
    }

    function handleTransitionEnd() {
      onTransitionEnd()
      if (!isActive.value && mergedDestroyOnHide.value) {
        contentMounted.value = false
      }
    }

    return {
      title: computed(() => props.title),
      disabled: computed(() => props.disabled),
      isActive,
      showContent,
      contentMounted,
      elevation,
      contentEl,
      expandIconPosition,
      mergedShowExpandIcon,
      expandIconSlotProps,
      hasParentExpandIcon,
      iconFallbackClass,
      ParentExpandIcon,
      idBase,
      n,
      classes,
      formatElevation,
      handleClick,
      handleKeydown,
      handleTransitionEnd,
      handleTransitionStart,
    }
  },
})
</script>
