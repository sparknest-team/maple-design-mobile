<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomFormatDemo from './demos/custom-format.vue'
import CustomStyleDemo from './demos/custom-style.vue'
import EmbedStatisticDemo from './demos/embed-statistic.vue'
import ManualControlDemo from './demos/manual-control.vue'
import ShowMillisecondDemo from './demos/show-millisecond.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="custom-format">
    <app-type>{{ english ? 'Custom Format' : '自定义格式' }}</app-type>
    <CustomFormatDemo />
  </section>

  <section data-demo="show-millisecond">
    <app-type>{{ english ? 'Show Millisecond' : '显示毫秒' }}</app-type>
    <ShowMillisecondDemo />
  </section>

  <section data-demo="custom-style">
    <app-type>{{ english ? 'Custom Style' : '自定义样式' }}</app-type>
    <CustomStyleDemo />
  </section>

  <section data-demo="manual-control">
    <app-type>{{ english ? 'Manual Control' : '手动控制' }}</app-type>
    <ManualControlDemo />
  </section>

  <section data-demo="embed-statistic">
    <app-type>{{ english ? 'Embed in Statistic' : '嵌入 Statistic' }}</app-type>
    <EmbedStatisticDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
