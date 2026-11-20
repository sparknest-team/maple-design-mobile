<script setup>
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicDemo from './demos/basic.vue'
import PausableEnglishDemo from './demos/en-US/pausable.vue'
import PausableDemo from './demos/pausable.vue'
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="notice-bar">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <BasicDemo />
  </section>

  <section data-demo="pausable">
    <PausableEnglishDemo v-if="english" />
    <PausableDemo v-else />
  </section>
</template>
