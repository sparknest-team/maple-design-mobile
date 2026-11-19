<script setup lang="ts">
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import DemoBasic from './demos/basic.vue'
import DemoControls from './demos/controls.vue'
import DemoFixChange from './demos/fix-change.vue'
import ContentOffsetContainerComparison from './demos/offset-container-comparison.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="affix">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type
    ><DemoBasic />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="offset-container-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">吸附方向、偏移与容器</span><span lang="en-US">Affix direction, offset and container</span>
    </h3>
    <ContentOffsetContainerComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="fix-change">
    <app-type>{{ english ? 'Change event' : '吸附状态变化' }}</app-type
    ><DemoFixChange />
  </section>

  <section data-demo="controls">
    <app-type>{{ english ? 'Disabled, CSS mode and manual update' : '禁用、CSS 模式与手动更新' }}</app-type>
    <DemoControls />
  </section>
</template>
