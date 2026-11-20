<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import ContentAppearanceComparison from './demos/appearance-comparison.vue'
import BasicDemo from './demos/basic.vue'
import DirectiveDemo from './demos/directive.vue'
import WrapDemo from './demos/wrap.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="loading">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic"><BasicDemo /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">加载图形、尺寸与颜色</span><span lang="en-US">Loading shape, size and color</span>
    </h3>
    <ContentAppearanceComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="wrap">
    <app-type>{{ english ? 'Wrap' : '包裹内容' }}</app-type>
    <WrapDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="directive">
    <app-type>{{ english ? 'Loading Directive' : '加载指令' }}</app-type>
    <DirectiveDemo />
  </section>
</template>
