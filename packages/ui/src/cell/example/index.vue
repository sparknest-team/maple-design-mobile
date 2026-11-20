<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContentContentComparison from './demos/content-comparison.vue'
import ListDemo from './demos/list.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="cell">
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

  <section data-demo="content-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">图标、描述与分隔线</span><span lang="en-US">Icons, descriptions and dividers</span>
    </h3>
    <ContentContentComparison />
  </section>

  <section data-demo="list">
    <app-type>{{ english ? 'Use As List Item' : '用作列表项' }}</app-type>
    <ListDemo />
  </section>
</template>
