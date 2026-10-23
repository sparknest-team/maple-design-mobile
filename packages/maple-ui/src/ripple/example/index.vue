<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomColorDemo from './demos/custom-color.vue'
import DisabledStatusDemo from './demos/disabled-status.vue'
import MotionTokenDemo from './demos/motion-token.vue'

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

  <section data-demo="custom-color">
    <app-type>{{ english ? 'Custom Color' : '自定义颜色' }}</app-type>
    <CustomColorDemo />
  </section>

  <section data-demo="disabled-status">
    <app-type>{{ english ? 'Disabled Status' : '禁用状态' }}</app-type>
    <DisabledStatusDemo />
  </section>
  <section data-demo="motion-token">
    <app-type>{{ english ? 'Longer motion tokens' : '长时长动效 Token' }}</app-type>
    <MotionTokenDemo :english="english" />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
