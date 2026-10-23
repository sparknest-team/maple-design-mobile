<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import TypeDemo from './demos/type.vue'

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

  <section data-demo="type">
    <app-type>{{ english ? 'Status' : '状态' }}</app-type>
    <TypeDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
