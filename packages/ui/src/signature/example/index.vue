<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomStyleDemo from './demos/custom-style.vue'
import SessionLifecycleDemo from './demos/session-lifecycle.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="signature">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-style">
    <app-type>{{ english ? 'Custom Style' : '自定义样式' }}</app-type>
    <CustomStyleDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="drawing-sessions">
    <span lang="zh-CN">书写会话</span>
    <span lang="en-US">Drawing sessions</span>
  </h2>

  <section data-demo="session-lifecycle">
    <app-type>{{ english ? 'Writing session cancellation' : '书写会话取消' }}</app-type>
    <SessionLifecycleDemo />
  </section>
</template>
