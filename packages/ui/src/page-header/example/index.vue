<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicUsageDemo from './demos/basic-usage.vue'
import CompleteDemo from './demos/complete.vue'
import ContentSurfaceComparison from './demos/surface-comparison.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="page-header">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="surface-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">面包屑与透明表面</span><span lang="en-US">Breadcrumbs and transparent surfaces</span>
    </h3>
    <ContentSurfaceComparison />
  </section>

  <section data-demo="complete">
    <app-type>{{ english ? 'Complete structure' : '完整结构' }}</app-type>
    <CompleteDemo />
  </section>
</template>
