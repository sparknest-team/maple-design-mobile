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
let origin: { x: number; y: number; target: EventTarget | null } | undefined
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
  origin = { x: event.touches[0].clientX, y: event.touches[0].clientY, target: event.currentTarget }
}
function end(event: TouchEvent) {
  const point = origin
  origin = undefined
  if (!point || !ctx.props.swipeable || event.touches.length || !event.changedTouches.length) {
    return
  }
  const dx = event.changedTouches[0].clientX - point.x
  const dy = event.changedTouches[0].clientY - point.y
  if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) {
    return
  }
  const enabled = ctx.entries.value.filter((tab) => !tab.disabled)
  const index = enabled.findIndex((tab) => tab.name === ctx.active.value)
  if (index < 0) {
    return
  }
  const rtl = (point.target as Element)?.closest('[dir]')?.getAttribute('dir') === 'rtl'
  const direction = (dx < 0 ? 1 : -1) * (rtl ? -1 : 1)
  const target = enabled[index + direction]
  if (target) {
    ctx.select(target.name)
  }
}
</script>
