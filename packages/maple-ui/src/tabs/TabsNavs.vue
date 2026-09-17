<template>
  <div :class="n('nav')">
    <slot name="prefix" />
    <button
      v-if="showButtons"
      type="button"
      :class="classes(n('scroll-button'), [ctx.props.scrollButtons === 'auto', n('--scroll-auto')])"
      aria-label="Previous tabs"
      @click="scroll(-1)"
    >
      ‹
    </button>
    <div
      ref="scroller"
      v-bind="$attrs"
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
      aria-label="Next tabs"
      @click="scroll(1)"
    >
      ›
    </button>
    <button
      v-if="ctx.props.editable && ctx.props.showAddButton"
      type="button"
      :class="n('add')"
      aria-label="Add tab"
      @click="ctx.add($event)"
    >
      <slot name="add-icon">+</slot>
    </button>
    <slot name="suffix" />
  </div>
</template>
<script setup lang="ts">
import { computed, inject, nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { tabsInjectionKey } from './context'
import { createNamespace } from './platform'
import { tabsNavsProps } from './props'

defineOptions({ name: createNamespace('tabs-navs').name, inheritAttrs: false })
defineProps(tabsNavsProps)
const ctx = inject(tabsInjectionKey)!
const { n, classes } = createNamespace('tabs')
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
  let delta = 0
  if (position === 'start') {
    delta = start
  } else if (position === 'center') {
    delta = start - (viewport - extent) / 2
  } else if (position === 'end') {
    delta = start - viewport + extent
  } else if (typeof position === 'number') {
    delta = start - position
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
    el.scrollLeft += direction * el.clientWidth * (el.closest('[dir]')?.getAttribute('dir') === 'rtl' ? -1 : 1)
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
  const rtl = el.closest('[dir]')?.getAttribute('dir') === 'rtl'
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
  window.removeEventListener('resize', resize)
})
defineExpose({ resize })
</script>
