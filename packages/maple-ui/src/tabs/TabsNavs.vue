<template>
  <div :class="n('nav')">
    <slot name="prefix" />
    <button
      v-if="showButtons"
      type="button"
      :class="classes(n('scroll-button'), [ctx.props.scrollButtons === 'auto', n('--scroll-auto')])"
      :aria-label="text.previous"
      @click="scroll(-1)"
    >
      {{ ctx.props.orientation !== 'vertical' && ctx.rtl.value ? '›' : '‹' }}
    </button>
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
    <button
      v-if="showButtons"
      type="button"
      :class="classes(n('scroll-button'), [ctx.props.scrollButtons === 'auto', n('--scroll-auto')])"
      :aria-label="text.next"
      @click="scroll(1)"
    >
      {{ ctx.props.orientation !== 'vertical' && ctx.rtl.value ? '‹' : '›' }}
    </button>
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
import { computed, inject, nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { resolveDirection } from '../_utils/direction'
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
let observer: ResizeObserver | undefined
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
  const rtl = !vertical && resolveDirection(el, ctx.rtl.value ? 'rtl' : 'ltr') === 'rtl'
  let delta = 0
  if (position === 'start') {
    delta = rtl ? start + extent - viewport : start
  } else if (position === 'center') {
    delta = start - (viewport - extent) / 2
  } else if (position === 'end') {
    delta = rtl ? start : start - viewport + extent
  } else if (typeof position === 'number') {
    delta = rtl ? start + extent - viewport + position : start - position
  } else if (start < 0) {
    delta = start
  } else if (start + extent > viewport) {
    delta = start + extent - viewport
  }
  if (vertical) {
    el.scrollTop += delta
  } else {
    el.scrollLeft += delta
  }
}
function scroll(direction: number) {
  const el = scroller.value
  if (!el) {
    return
  }
  if (ctx.props.orientation === 'vertical') {
    el.scrollTop += direction * el.clientHeight
  } else {
    el.scrollLeft +=
      direction * el.clientWidth * (resolveDirection(el, ctx.rtl.value ? 'rtl' : 'ltr') === 'rtl' ? -1 : 1)
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
  const rtl = resolveDirection(el, ctx.rtl.value ? 'rtl' : 'ltr') === 'rtl'
  el.scrollLeft += event.deltaY * (rtl ? -1 : 1)
}
async function refresh() {
  await nextTick()
  observer?.disconnect()
  if (scroller.value) {
    observer?.observe(scroller.value)
    for (const el of Array.from(scroller.value.children)) {
      observer?.observe(el)
    }
  }
  resize()
}
watch(
  () => [
    ctx.active.value,
    ctx.entries.value,
    ctx.props.orientation,
    ctx.props.size,
    ctx.props.variant,
    ctx.props.scrollPosition,
  ],
  refresh,
  { flush: 'post' },
)
onMounted(() => {
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(resize)
  }
  window.addEventListener('resize', resize)
  refresh()
})
onActivated(refresh)
onBeforeUnmount(() => {
  observer?.disconnect()
  observer = undefined
  window.removeEventListener('resize', resize)
})
defineExpose<TabsNavsExpose>({ resize })
</script>
