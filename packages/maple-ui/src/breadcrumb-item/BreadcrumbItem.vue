<template>
  <template v-if="shouldRender">
    <mp-menu
      v-if="hasDropdown"
      v-bind="dropdownProps"
      v-model:open="dropdownOpen"
      :options="dropdownOptions"
      @select="handleSelect"
    >
      <div :class="classes(n(), n('--with-dropdown'))" role="listitem">
        <component
          :is="tag"
          :class="classes(n('content'), [!isLast, n('--active')])"
          :href="tag === 'a' ? href : undefined"
          v-bind="$attrs"
          @click="handleClick"
        >
          <slot />
          <icon-chevron-down :class="classes(n('dropdown-icon'), [dropdownOpen, n('--dropdown-icon-active')])" />
        </component>
      </div>
      <template v-if="$slots.droplist" #content><slot name="droplist" /></template>
    </mp-menu>

    <div
      v-else
      :class="n()"
      role="listitem"
      v-bind="displayMore ? { 'aria-label': 'ellipses of breadcrumb items' } : undefined"
    >
      <component
        :is="tag"
        :class="classes(n('content'), [!isLast && !displayMore, n('--active')])"
        :href="tag === 'a' ? href : undefined"
        v-bind="$attrs"
        @click="handleClick"
      >
        <template v-if="displayMore">
          <span :class="n('more-icon')">
            <v-nodes v-if="parentMoreIconNodes" :vnodes="parentMoreIconNodes" />
            <icon-more v-else />
          </span>
        </template>
        <slot v-else />
      </component>
    </div>

    <slot v-if="!isLast" name="separator">
      <div :class="n('separator')" aria-hidden="true">
        <v-nodes v-if="parentSeparatorNodes" :vnodes="parentSeparatorNodes" />
        <template v-else>{{ separator ?? parentSeparator }}</template>
      </div>
    </slot>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type VNode } from 'vue'
import { IconChevronDown } from '@maplejs/icons-vue/icon-chevron-down'
import { IconMore } from '@maplejs/icons-vue/icon-more'
import MpMenu from '../menu'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useBreadcrumbItem } from './provide'

const { name, n, classes } = createNamespace('breadcrumb-item')

const VNodes = (_: unknown, { attrs }: { attrs: { vnodes?: VNode | VNode[] } }) => attrs.vnodes

export default defineComponent({
  name,
  inheritAttrs: false,
  components: { VNodes, MpMenu, IconChevronDown, IconMore },
  props,
  emits: ['click', 'select'],
  setup(props, { slots, emit }) {
    const { index, breadcrumb, bindBreadcrumb } = useBreadcrumbItem()
    const dropdownOpen = ref(false)
    bindBreadcrumb?.(null)

    const total = computed(() => breadcrumb?.length.value ?? 0)
    const maxCount = computed(() => breadcrumb?.maxCount.value ?? 0)
    const needHide = computed(() => breadcrumb?.needHide.value ?? false)
    const itemIndex = computed(() => index?.value ?? 0)

    const shouldRender = computed(() => {
      if (needHide.value && itemIndex.value > 1 && itemIndex.value <= total.value - maxCount.value) {
        return false
      }
      return true
    })

    const displayMore = computed(() => (needHide.value ? itemIndex.value === 1 : false))

    const isLast = computed(() => {
      if (!breadcrumb || index == null) {
        return false
      }
      return index.value === breadcrumb.length.value - 1
    })

    const parentSeparator = computed(() => breadcrumb?.separator.value)
    const parentSeparatorNodes = computed(() => {
      if (slots.separator || props.separator != null) {
        return undefined
      }
      return breadcrumb?.slots.separator?.()
    })
    const parentMoreIconNodes = computed(() => breadcrumb?.slots['more-icon']?.(breadcrumb.moreSlotData.value))
    const hasDropdown = computed(() => Boolean(props.droplist?.length || slots.droplist))
    const dropdownOptions = computed(
      () => props.droplist?.map((item) => ({ label: item.label, value: item.path })) ?? [],
    )
    const tag = computed(() => (props.href && !displayMore.value ? 'a' : 'div'))

    function handleClick(e: Event) {
      if (displayMore.value) {
        return
      }
      emit('click', e)
    }

    function handleSelect(value: unknown) {
      const route = props.droplist?.find((item) => item.path === value)
      if (route) {
        emit('select', route)
      }
    }

    return {
      n,
      classes,
      shouldRender,
      displayMore,
      isLast,
      parentSeparator,
      parentSeparatorNodes,
      parentMoreIconNodes,
      hasDropdown,
      dropdownOpen,
      dropdownOptions,
      tag,
      handleClick,
      handleSelect,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './breadcrumb-item';
</style>
