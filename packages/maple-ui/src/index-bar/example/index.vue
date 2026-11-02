<script setup>
import BasicDemo from './demos/basic.vue'
import GroupedLifecycleDemo from './demos/lifecycle.vue'
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="index-bar">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <BasicDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="lifecycle-and-edge-cases">
    <span lang="zh-CN">生命周期与边界</span>
    <span lang="en-US">Lifecycle and edge cases</span>
  </h2>

  <section data-demo="lifecycle">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">停用、卸载与保留命令</span
      ><span lang="en-US">Deactivation, disposal and retained commands</span>
    </h3>
    <GroupedLifecycleDemo />
  </section>
</template>
