<script setup>
import { AppType, currentTheme, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicUsageDemo from './demos/basic-usage.vue'
import WordWrapDemo from './demos/word-wrap.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="code">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo :dark="currentTheme?.toLowerCase().includes('dark')" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="word-wrap">
    <app-type>{{ english ? 'Word Wrap' : '自动换行' }}</app-type>
    <WordWrapDemo :dark="currentTheme?.toLowerCase().includes('dark')" />
  </section>
</template>
