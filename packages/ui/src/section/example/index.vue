<script setup lang="ts">
import { onThemeChange } from '@maple-design/cli-vue/client'
import CardDemo from './demos/card.vue'
import HeadingOptionsDemo from './demos/heading-options.vue'
import InlineFormDemo from './demos/inline-form.vue'
import LineDemo from './demos/line.vue'
import PlainDemo from './demos/plain.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="section">
    <span lang="zh-CN">基础示例</span><span lang="en-US">Basic examples</span>
  </h2>
  <section data-demo="plain">
    <h3 class="mobile-demo-case-heading"><span lang="zh-CN">普通分区</span><span lang="en-US">Plain section</span></h3>
    <PlainDemo />
  </section>
  <section data-demo="line">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">带线分区</span><span lang="en-US">Section with a line</span>
    </h3>
    <LineDemo />
  </section>
  <section data-demo="card">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">卡片与自定义标题</span><span lang="en-US">Card with a custom heading</span>
    </h3>
    <CardDemo />
  </section>
  <section data-demo="heading-options">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">有标题、仅说明与纯正文</span><span lang="en-US">With or without a heading</span>
    </h3>
    <HeadingOptionsDemo />
  </section>
  <section data-demo="inline-form">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">行内表单分组</span><span lang="en-US">Grouping inline form fields</span>
    </h3>
    <InlineFormDemo />
  </section>
</template>
