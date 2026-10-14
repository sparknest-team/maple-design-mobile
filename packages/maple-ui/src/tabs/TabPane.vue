<template>
  <TabItem :key="key" :lazy-load="lazyLoad" :destroy-on-hide="destroyOnHide"><slot /></TabItem>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { createNamespace } from '../utils/components'
import { tabPaneProps, type TabsKey } from './props'
import TabItem from './TabItem.vue'
import type { TabPaneSlots } from './types'

defineSlots<TabPaneSlots>()
defineOptions({ name: createNamespace('tab-pane').name })
defineProps(tabPaneProps)
const instance = getCurrentInstance()!
const key = computed(() => instance.vnode.key as TabsKey)
</script>
