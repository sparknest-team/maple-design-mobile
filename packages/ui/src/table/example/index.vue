<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import FixedHeaderDemo from './demos/fixed-header.vue'
import ExplicitLoadingDemo from './demos/loading.vue'
import SlotDemo from './demos/slot.vue'
import ScenarioDemo from './demos/task-workbench.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="table">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="scrolling-and-sticky-positioning">
    <span lang="zh-CN">滚动与粘性定位</span>
    <span lang="en-US">Scrolling and sticky positioning</span>
  </h2>

  <section data-demo="fixed-header">
    <app-type>{{ english ? 'Fixed Table Headers' : '固定表头' }}</app-type>
    <FixedHeaderDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-slots">
    <span lang="zh-CN">内容与插槽</span>
    <span lang="en-US">Content and slots</span>
  </h2>

  <section data-demo="slot">
    <app-type>{{ english ? 'Footer Slots' : '尾部插槽' }}</app-type>
    <SlotDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="business-workflows">
    <span lang="zh-CN">业务组合</span>
    <span lang="en-US">Business workflows</span>
  </h2>

  <section id="task-workbench" data-demo="task-workbench">
    <h3>任务筛选与数据联动</h3>
    <ScenarioDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="loading">
    <h3>受控加载 / Controlled loading</h3>
    <ExplicitLoadingDemo />
  </section>
</template>
