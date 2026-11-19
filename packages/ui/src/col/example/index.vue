<script setup lang="ts">
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import Demo0 from './demos/basic.vue'
import Demo2 from './demos/flex.vue'
import Demo1 from './demos/order.vue'
import Demo3 from './demos/responsive.vue'

onThemeChange()
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="col">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section aria-labelledby="layout-usage-title">
    <app-type id="layout-usage-title">{{ english ? 'Choosing a layout component' : '布局组件选择' }}</app-type>
    <p>
      {{ english ? 'Use Grid / GridItem for two-dimensional grid layouts.' : 'Grid / GridItem 用于二维网格布局。' }}
    </p>
    <p>{{ english ? 'Use Row / Col for 24-column layouts.' : 'Row / Col 用于 24 栏栅格布局。' }}</p>
    <p>
      {{ english ? 'Use Space for content spacing and one-dimensional alignment.' : 'Space 用于内容间距与一维排列。' }}
    </p>
  </section>

  <section data-demo="basic">
    <app-type>{{ english ? 'Span and offset' : '列宽与偏移' }}</app-type
    ><Demo0 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="flex">
    <app-type>{{ english ? 'Flexible ratios and fixed widths' : '弹性比例与固定宽度' }}</app-type
    ><Demo2 />
  </section>

  <section data-demo="responsive">
    <app-type>{{ english ? 'Responsive objects and visibility' : '响应式对象与隐藏恢复' }}</app-type
    ><Demo3 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="order">
    <app-type>{{ english ? 'Ordering and resetting to zero' : '排序与零值恢复' }}</app-type
    ><Demo1 />
  </section>
</template>
