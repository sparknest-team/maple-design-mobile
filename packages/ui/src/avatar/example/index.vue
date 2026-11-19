<script setup lang="ts">
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import DemoAutoFix from './demos/auto-fix.vue'
import DemoBasic from './demos/basic.vue'
import DemoFallback from './demos/fallback.vue'
import DemoFit from './demos/fit.vue'
import ContentGroupComparison from './demos/group-comparison.vue'
import DemoHoverable from './demos/hoverable.vue'
import DemoImage from './demos/image.vue'
import ContentShapeSizeComparison from './demos/shape-size-comparison.vue'
import DemoStyle from './demos/style.vue'
import DemoTrigger from './demos/trigger.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="avatar">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <DemoBasic />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="shape-size-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">尺寸与形状对比</span><span lang="en-US">Size and shape comparison</span>
    </h3>
    <ContentShapeSizeComparison />
  </section>

  <section data-demo="style">
    <app-type>{{ english ? 'Color and border' : '颜色与边框' }}</app-type>
    <DemoStyle />
  </section>

  <section data-demo="hoverable">
    <app-type>{{ english ? 'Hoverable' : '头像可悬停' }}</app-type>
    <DemoHoverable />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="group-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">头像组排列与溢出</span><span lang="en-US">Group direction and overflow</span>
    </h3>
    <ContentGroupComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="auto-fix">
    <app-type>{{ english ? 'Auto-fit text' : '文字自适应' }}</app-type>
    <DemoAutoFix />
  </section>

  <section data-demo="image">
    <app-type>{{ english ? 'Image avatar' : '图片头像' }}</app-type>
    <DemoImage />
  </section>

  <section data-demo="fit">
    <app-type>{{ english ? 'Image fit' : '图片填充' }}</app-type>
    <DemoFit />
  </section>

  <section data-demo="fallback">
    <app-type>{{ english ? 'Loading and fallback' : '加载与回退' }}</app-type>
    <DemoFallback />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger icon' : '交互图标' }}</app-type>
    <DemoTrigger />
  </section>
</template>
