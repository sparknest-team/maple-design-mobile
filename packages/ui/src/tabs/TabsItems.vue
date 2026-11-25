<template>
  <div
    :hidden="ctx.props.hideContent"
    :class="classes(n('content'), [ctx.props.swipeable, n('--swipeable')], [ctx.props.animation, n('--animated')])"
    @touchstart.passive="start"
    @touchend.passive="end"
    @touchcancel="origin = undefined"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { createNamespace } from '../utils/components'
import { tabsInjectionKey } from './context'
import { tabsItemsProps } from './props'
import type { TabsItemsSlots } from './types'

defineSlots<TabsItemsSlots>()
defineOptions({ name: createNamespace('tabs-items').name })
defineProps(tabsItemsProps)
const ctx = inject(tabsInjectionKey)!
const { n, classes } = createNamespace('tabs')
let origin: Touch | undefined
function start(event: TouchEvent) {
  origin = undefined
  if (!ctx.props.swipeable || event.touches.length !== 1) {
    return
  }
  if (
    (event.target as Element)?.closest(
      'input, textarea, select, button, a, [contenteditable="true"], [data-tabs-no-swipe]',
    )
  ) {
    return
  }
  origin = event.touches[0]
}
function end(event: TouchEvent) {
  const point = origin
  origin = undefined
  if (!point || !ctx.props.swipeable || event.touches.length || !event.changedTouches.length) {
    return
  }
  const dx = event.changedTouches[0].clientX - point.clientX
  const dy = event.changedTouches[0].clientY - point.clientY
  if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) {
    return
  }
  const enabled = ctx.enabled.value
  const index = ctx.active.value === undefined ? -1 : enabled.indexOf(ctx.active.value)
  if (index < 0) {
    return
  }
  const rtl = ctx.rtlAt(event.currentTarget as Element)
  const direction = (dx < 0 ? 1 : -1) * (rtl ? -1 : 1)
  const target = enabled[index + direction]
  if (target !== undefined) {
    ctx.select(target)
  }
}
</script>
