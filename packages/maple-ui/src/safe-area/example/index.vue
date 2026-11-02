<script setup lang="ts">
import AffectedComponents from './demos/affected-components.vue'
import AppForm from './demos/app-form.vue'
import Basic from './demos/basic.vue'
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="safe-area">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <Basic />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="page-and-component-composition">
    <span lang="zh-CN">页面与组件组合</span>
    <span lang="en-US">Page and component composition</span>
  </h2>

  <section data-demo="app-form"><AppForm /></section>

  <section data-demo="affected-components"><AffectedComponents /></section>
</template>
