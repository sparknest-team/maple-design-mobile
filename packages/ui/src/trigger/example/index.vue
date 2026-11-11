<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import BasicDemo from './demos/basic.vue'
import ControlledDemo from './demos/controlled.vue'
import PlacementDemo from './demos/placement.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="trigger">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="placement">
    <app-type>{{ english ? 'Placement and arrow' : '方位与箭头' }}</app-type>
    <PlacementDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled state and offset' : '受控状态与偏移' }}</app-type>
    <ControlledDemo />
  </section>
</template>
