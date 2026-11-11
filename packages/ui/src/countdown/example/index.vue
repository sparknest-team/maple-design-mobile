<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import EmbedStatisticDemo from './demos/embed-statistic.vue'
import ContentFormatComparison from './demos/format-comparison.vue'
import ManualControlDemo from './demos/manual-control.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="countdown">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="embed-statistic">
    <app-type>{{ english ? 'Embed in Statistic' : '嵌入 Statistic' }}</app-type>
    <EmbedStatisticDemo />
  </section>

  <section data-demo="format-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">时间格式与自定义内容</span><span lang="en-US">Time format and custom content</span>
    </h3>
    <ContentFormatComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="manual-control">
    <app-type>{{ english ? 'Manual Control' : '手动控制' }}</app-type>
    <ManualControlDemo />
  </section>
</template>
