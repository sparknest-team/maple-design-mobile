<template>
  <div
    :id="ctx.id(key, 'panel')"
    role="tabpanel"
    :aria-labelledby="ctx.id(key, 'tab')"
    :hidden="!active"
    :tabindex="0"
    :class="[classes(n('content-item'), [active, n('--content-item-active')]), ctx.props.itemWrapperClass]"
    :style="ctx.props.itemWrapperStyle"
  >
    <div v-if="mounted" :class="[n('pane'), ctx.props.itemClass]" :style="ctx.props.itemStyle"><slot /></div>
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, inject, ref, watch } from 'vue'
import { createNamespace } from '../utils/components'
import { tabsInjectionKey } from './context'
import { tabItemProps, type TabsKey } from './props'
import type { TabItemSlots } from './types'

defineSlots<TabItemSlots>()
defineOptions({ name: createNamespace('tab-item').name })
const props = defineProps(tabItemProps)
const ctx = inject(tabsInjectionKey)!
const instance = getCurrentInstance()!
const { n, classes } = createNamespace('tabs')
const key = computed(() => instance.vnode.key as TabsKey)
const active = computed(() => ctx.active.value === key.value)
const visited = ref(active.value)
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
