<template>
  <div
    v-if="show"
    :class="classes(n(), [displayMore, n('--more')])"
    role="listitem"
    v-bind="displayMore ? { 'aria-label': 'ellipses of breadcrumb items' } : undefined"
  >
    <component
      :is="tag"
      :class="classes(n('content'), [!isLast && !displayMore, n('--active')])"
      :href="tag === 'a' ? href : undefined"
      @click="handleClick"
    >
      <template v-if="displayMore">
        <span :class="n('more-icon')">
          <v-nodes v-if="parentMoreIconNodes" :vnodes="parentMoreIconNodes" />
          <template v-else>...</template>
        </span>
      </template>
      <slot v-else />
    </component>

    <slot v-if="!isLast" name="separator">
      <div :class="n('separator')" aria-hidden="true">
        <v-nodes v-if="parentSeparatorNodes" :vnodes="parentSeparatorNodes" />
        <template v-else>{{ separator ?? parentSeparator }}</template>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type VNode } from 'vue'
import { call } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useBreadcrumbItem } from './provide'

const { name, n, classes } = createNamespace('breadcrumb-item')

const VNodes = (_: unknown, { attrs }: { attrs: { vnodes?: VNode | VNode[] } }) => attrs.vnodes

export default defineComponent({
  name,
  components: { VNodes },
  props,
  setup(props, { slots }) {
    const { index, breadcrumb, bindBreadcrumb } = useBreadcrumbItem()
    bindBreadcrumb?.(null)

    const total = computed(() => breadcrumb?.length.value ?? 0)
    const maxCount = computed(() => breadcrumb?.maxCount.value ?? 0)
    const needHide = computed(() => breadcrumb?.needHide.value ?? false)
    const itemIndex = computed(() => index?.value ?? 0)

    const show = computed(() => {
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
    const parentMoreIconNodes = computed(() => breadcrumb?.slots['more-icon']?.())
    const tag = computed(() => (props.href && !isLast.value && !displayMore.value ? 'a' : 'div'))

    function handleClick(e: Event) {
      if (isLast.value || displayMore.value) {
        return
      }
      call(props.onClick, e)
    }

    return {
      n,
      classes,
      show,
      displayMore,
      isLast,
      parentSeparator,
      parentSeparatorNodes,
      parentMoreIconNodes,
      tag,
      handleClick,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './breadcrumb-item';
</style>
