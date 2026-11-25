<template>
  <div :class="n('nav')">
    <slot name="prefix" />
    <ScrollButton v-if="showButtons" :direction="-1" />
    <div
      ref="scroller"
      v-bind="$attrs"
      :aria-label="
        typeof $attrs['aria-label'] === 'string'
          ? $attrs['aria-label']
          : $attrs['aria-labelledby']
            ? undefined
            : ctx.props.tabListAriaLabel
      "
      role="tablist"
      :aria-orientation="ctx.props.orientation"
      :class="n('nav-list')"
      @wheel="wheel"
    >
      <slot />
    </div>
    <ScrollButton v-if="showButtons" :direction="1" />
    <button
      v-if="ctx.props.editable && ctx.props.showAddButton"
      type="button"
      :class="n('add')"
      :aria-label="text.add"
      @click="ctx.add($event)"
    >
      <slot name="add-icon">+</slot>
    </button>
    <slot name="suffix" />
  </div>
</template>
<script setup lang="ts">
import { computed, h, inject, nextTick, ref, watch } from 'vue'
import { useActiveTarget } from '../utils/active-target'
import { createNamespace } from '../utils/components'
import { tabsInjectionKey } from './context'
import { tabsNavsProps } from './props'
import type { TabsNavsExpose, TabsNavsSlots } from './types'
import { useTabsLocale } from './use-tabs-configuration'

defineSlots<TabsNavsSlots>()
defineOptions({ name: createNamespace('tabs-navs').name, inheritAttrs: false })
defineProps(tabsNavsProps)
const ctx = inject(tabsInjectionKey)!
const { n, classes } = createNamespace('tabs')
const text = useTabsLocale()
const scroller = ref<HTMLElement>()
const overflow = ref(false)
const showButtons = computed(() => ctx.props.scrollButtons !== false && overflow.value)
function resize() {
  const el = scroller.value
  if (!el) {
    return
  }
  const vertical = ctx.props.orientation === 'vertical'
  overflow.value = vertical ? el.scrollHeight > el.clientHeight : el.scrollWidth > el.clientWidth
  const tab = el.querySelector<HTMLElement>('[aria-selected="true"]')
  if (!tab) {
    return
  }
  const box = el.getBoundingClientRect()
  const rect = tab.getBoundingClientRect()
  const start = vertical ? rect.top - box.top : rect.left - box.left
  const extent = vertical ? rect.height : rect.width
  const viewport = vertical ? el.clientHeight : el.clientWidth
  const position = ctx.props.scrollPosition
  const rtl = !vertical && ctx.rtlAt(el)
  const end = start + extent - viewport
  let delta: number
  if (position === 'center') {
    delta = (start + end) / 2
  } else if (position === 'start') {
    delta = rtl ? end : start
  } else if (position === 'end') {
    delta = rtl ? start : end
  } else if (typeof position === 'number') {
    delta = rtl ? end + position : start - position
  } else {
    delta = start < 0 ? start : Math.max(0, end)
  }
  if (vertical) {
    el.scrollTop += delta
  } else {
    el.scrollLeft += delta
  }
}
function ScrollButton({ direction }: { direction: number }) {
  const previous = direction < 0
  const reversed = ctx.props.orientation !== 'vertical' && ctx.rtl.value
  return h(
    'button',
    {
      type: 'button',
      class: classes(n('scroll-button'), [ctx.props.scrollButtons === 'auto', n('--scroll-auto')]),
      'aria-label': previous ? text.value.previous : text.value.next,
      onClick: () => scroll(direction),
    },
    previous !== reversed ? '‹' : '›',
  )
}
function scroll(direction: number) {
  const el = scroller.value
  if (!el) {
    return
  }
  if (ctx.props.orientation === 'vertical') {
    el.scrollTop += direction * el.clientHeight
  } else {
    el.scrollLeft += direction * el.clientWidth * (ctx.rtlAt(el) ? -1 : 1)
  }
}
function wheel(event: WheelEvent) {
  const el = scroller.value
  if (
    !el ||
    !overflow.value ||
    ctx.props.orientation === 'vertical' ||
    Math.abs(event.deltaX) >= Math.abs(event.deltaY)
  ) {
    return
  }
  event.preventDefault()
  const rtl = ctx.rtlAt(el)
  el.scrollLeft += event.deltaY * (rtl ? -1 : 1)
}
useActiveTarget(
  () => scroller.value?.ownerDocument.defaultView ?? undefined,
  (view) => {
    let active = true
    const onResize = () => {
      if (active) {
        resize()
      }
    }
    const observed = view.ResizeObserver && new view.ResizeObserver(onResize)
    const observe = () => {
      if (!active) {
        return
      }
      const list = scroller.value
      if (observed && list) {
        observed.disconnect()
        observed.observe(list)
        for (const child of list.children) {
          observed.observe(child)
        }
      }
      resize()
    }
    const stop = watch(
      () => [
        ctx.active.value,
        ctx.entries.value,
        ctx.props.orientation,
        ctx.props.size,
        ctx.props.variant,
        ctx.props.scrollPosition,
      ],
      observe,
      { flush: 'post' },
    )
    view.addEventListener('resize', onResize)
    nextTick(observe)
    return () => {
      observed?.disconnect()
      active = false
      stop()
      view.removeEventListener('resize', onResize)
    }
  },
)
defineExpose<TabsNavsExpose>({ resize })
</script>
