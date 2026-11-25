<template>
  <div :class="cls" @wheel="onUserInteraction" @pointerdown="onUserInteraction" @touchstart="onUserInteraction">
    <div v-if="$slots.header && (!empty || showHeaderOnEmpty)" :class="`${prefixCls}-header`">
      <slot name="header" />
    </div>
    <loading v-if="loading" :class="`${prefixCls}-loading`" />
    <div v-else-if="empty" :class="`${prefixCls}-empty`">
      <slot name="empty">
        <component :is="SelectEmpty" />
      </slot>
    </div>
    <div
      v-if="virtualList && !loading && !empty"
      :id="listboxId"
      :role="listboxId ? 'listbox' : undefined"
      :aria-multiselectable="listboxId ? multiple : undefined"
    >
      <slot name="virtual-list" />
    </div>
    <component
      :is="displayScrollbar ? 'ScrollbarComponent' : 'div'"
      v-if="!virtualList"
      ref="wrapperComRef"
      :class="`${prefixCls}-list-wrapper`"
      v-bind="
        displayScrollbar
          ? {
              ...scrollbarProps,
              outerStyle: [scrollbarProps?.outerStyle, !loading && !empty ? undefined : { display: 'none' }],
            }
          : { style: !loading && !empty ? undefined : { display: 'none' } }
      "
      @scroll="handleScroll"
    >
      <ul
        :id="listboxId"
        :role="listboxId ? 'listbox' : undefined"
        :aria-multiselectable="listboxId ? multiple : undefined"
        :class="`${prefixCls}-list`"
      >
        <slot />
      </ul>
    </component>
    <div v-if="$slots.footer && (!empty || showFooterOnEmpty)" :class="`${prefixCls}-footer`">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import Scrollbar from '../_components/selection-scrollbar/Scrollbar.vue'
import type { ScrollbarProps } from '../_components/selection-scrollbar/types'
import { useComponentRef } from '../_hooks/use-component-ref'
import { useScrollbar } from '../_hooks/use-scrollbar'
import type { EmitType } from '../_utils/types'
import Empty from '../empty/Empty.vue'
import Loading from '../loading/Loading.vue'
import { createNamespace, getPrefixCls } from '../utils/components'

const { name } = createNamespace('select-dropdown')

export default defineComponent({
  name,
  components: {
    ScrollbarComponent: Scrollbar,
    Loading,
  },
  props: {
    onUserInteraction: Function as PropType<() => void>,
    listboxId: String,
    multiple: Boolean,
    loading: Boolean,
    empty: Boolean,
    virtualList: Boolean,
    bottomOffset: {
      type: Number,
      default: 0,
    },
    scrollbar: {
      type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
    onScroll: {
      type: [Function, Array] as PropType<EmitType<(ev: Event) => void>>,
    },
    onReachBottom: {
      type: [Function, Array] as PropType<EmitType<(ev: Event) => void>>,
    },
    showHeaderOnEmpty: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showFooterOnEmpty: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['scroll', 'reach-bottom'],
  setup(props, { emit, slots }) {
    const { scrollbar } = toRefs(props)
    const prefixCls = getPrefixCls('select-dropdown')
    const emptySlot = useEmptySlot()
    const SelectEmpty = () => emptySlot.value?.({ component: 'select' }) ?? h(Empty)

    const { componentRef: wrapperComRef, elementRef: wrapperRef } = useComponentRef('containerRef')
    const { displayScrollbar, scrollbarProps } = useScrollbar(scrollbar)

    const handleScroll = (e: Event) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement
      const bottom = scrollHeight - (scrollTop + clientHeight)
      if (bottom <= props.bottomOffset) {
        emit('reach-bottom', e)
      }
      emit('scroll', e)
    }

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-has-header`]: Boolean(slots.header),
        [`${prefixCls}-has-footer`]: Boolean(slots.footer),
      },
    ])

    return {
      prefixCls,
      SelectEmpty,
      cls,
      wrapperRef,
      wrapperComRef,
      handleScroll,
      displayScrollbar,
      scrollbarProps,
    }
  },
})
</script>
