<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicDemo from './demos/basic.vue'
import BasicDemoEn from './demos/en-US/basic.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="loading-bar">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <component :is="english ? BasicDemoEn : BasicDemo" />
  </section>
</template>
