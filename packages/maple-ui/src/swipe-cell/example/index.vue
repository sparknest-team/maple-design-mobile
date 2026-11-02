<script setup>
import BasicDemo from './demos/basic.vue'
import BeforeCloseDemo from './demos/before-close.vue'
import BothSidesDemo from './demos/both-sides.vue'
import ExplicitLoadingDemo from './demos/loading.vue'
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="swipe-cell">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <BasicDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="directions-and-actions">
    <span lang="zh-CN">方向与操作区域</span>
    <span lang="en-US">Directions and actions</span>
  </h2>

  <section data-demo="both-sides">
    <BothSidesDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-closing-control">
    <span lang="zh-CN">异步关闭控制</span>
    <span lang="en-US">Async closing control</span>
  </h2>

  <section data-demo="before-close">
    <BeforeCloseDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="loading">
    <h3>受控加载 / Controlled loading</h3>
    <ExplicitLoadingDemo />
  </section>
</template>
