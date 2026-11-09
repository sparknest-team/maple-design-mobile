<script setup>
import BasicDemo from './demos/basic.vue'
import LocalThemeDemo from './demos/local-theme.vue'
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="theme-provider">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <BasicDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="local-themes">
    <span lang="zh-CN">局部主题</span>
    <span lang="en-US">Local themes</span>
  </h2>

  <section data-demo="local-theme"><LocalThemeDemo /></section>
</template>
