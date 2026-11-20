<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicDemo from './demos/basic.vue'
import CustomStatusDemo from './demos/custom-status.vue'
import BasicDemoEn from './demos/en-US/basic.vue'
import CustomStatusDemoEn from './demos/en-US/custom-status.vue'
import ErrorDemoEn from './demos/en-US/error.vue'
import ErrorDemo from './demos/error.vue'
import OrganizedSchedulerLifecycle from './demos/scheduler-lifecycle.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="infinite-scroll">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <component :is="english ? BasicDemoEn : BasicDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="error">
    <app-type>{{ english ? 'Retry on Error' : '失败重试' }}</app-type>
    <component :is="english ? ErrorDemoEn : ErrorDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-status">
    <app-type>{{ english ? 'Custom Status' : '自定义状态' }}</app-type>
    <component :is="english ? CustomStatusDemoEn : CustomStatusDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="lifecycle-and-edge-cases">
    <span lang="zh-CN">生命周期与边界</span>
    <span lang="en-US">Lifecycle and edge cases</span>
  </h2>

  <section data-demo="scheduler-lifecycle">
    <app-type>{{ english ? 'Measurement Binding Lifecycle' : '测量绑定生命周期' }}</app-type>
    <OrganizedSchedulerLifecycle />
  </section>
</template>
