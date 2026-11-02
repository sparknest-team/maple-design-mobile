<script setup>
import ControlSizes from './demos/control-sizes.vue'
import SharedLoadingDemo from './demos/loading.vue'
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="field-decorator">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="shared-loading">
    <h3>共享字段加载 / Shared field loading</h3>
    <SharedLoadingDemo />
  </section>
</template>
