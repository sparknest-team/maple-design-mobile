<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import BreadcrumbDemo from './demos/breadcrumb.vue'
import CompleteDemo from './demos/complete.vue'
import TransparentDemo from './demos/transparent.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="breadcrumb">
    <app-type>{{ english ? 'Content above the heading' : '页头上方内容' }}</app-type>
    <BreadcrumbDemo />
  </section>

  <section data-demo="complete">
    <app-type>{{ english ? 'Complete structure' : '完整结构' }}</app-type>
    <CompleteDemo />
  </section>
  <section data-demo="transparent">
    <app-type>{{ english ? 'Transparent background' : '透明底色' }}</app-type>
    <TransparentDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
