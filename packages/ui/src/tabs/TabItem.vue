<template>
  <div
    :id="ctx.id(name, 'panel')"
    ref="panel"
    role="tabpanel"
    :aria-labelledby="ctx.id(name, 'tab')"
    :hidden="!active"
    :tabindex="0"
    :class="[classes(n('content-item'), [active, n('--content-item-active')]), ctx.props.itemWrapperClass]"
    :style="ctx.props.itemWrapperStyle"
  >
    <div v-if="mounted" :class="[n('pane'), ctx.props.itemClass]" :style="ctx.props.itemStyle"><slot /></div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from 'vue'
import { createNamespace } from '../utils/components'
import { focusScope, tabsInjectionKey } from './context'
import { tabItemProps } from './props'
import type { TabItemSlots } from './types'

defineSlots<TabItemSlots>()
defineOptions({ name: createNamespace('tab-item').name })
const props = defineProps(tabItemProps)
const ctx = inject(tabsInjectionKey)!
const { n, classes } = createNamespace('tabs')
const active = computed(() => ctx.active.value === props.name)
const visited = ref(active.value)
const panel = ref<HTMLElement>()
let focusGeneration = 0
watch(
  active,
  (value) => {
    const generation = ++focusGeneration
    if (value) {
      return
    }
    const element = panel.value
    if (!element) {
      return
    }
    const scope = focusScope(element)
    const origin = scope.activeElement
    if (!origin || !element.contains(origin)) {
      return
    }
    nextTick(() =>
      nextTick(() => {
        if (generation !== focusGeneration || !element.isConnected) {
          return
        }
        const doc = element.ownerDocument
        const focus = scope.activeElement ?? doc.activeElement
        if (focus && focus !== doc.body && focus !== origin && !element.contains(focus)) {
          return
        }
        if (ctx.active.value !== undefined) {
          ctx.focusTab(ctx.active.value, scope)
        }
      }),
    )
  },
  { flush: 'sync' },
)
watch(active, (value) => {
  if (value) {
    visited.value = true
  }
})
const mounted = computed(
  () =>
    active.value ||
    (!(props.destroyOnHide ?? ctx.props.destroyOnHide) && (!(props.lazyLoad ?? ctx.props.lazyLoad) || visited.value)),
)
</script>
