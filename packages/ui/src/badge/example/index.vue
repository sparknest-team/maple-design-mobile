<script setup lang="ts">
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DemoBasic from './demos/basic.vue'
import DemoColor from './demos/color.vue'
import DemoContent from './demos/content.vue'
import DemoDot from './demos/dot.vue'
import DemoInline from './demos/inline.vue'
import DemoMax from './demos/max.vue'
import DemoPosition from './demos/position.vue'
import DemoShow from './demos/show.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="badge">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type><DemoBasic />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="color">
    <app-type>{{ english ? 'Statuses and colors' : '状态和颜色' }}</app-type><DemoColor />
  </section>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <OrganizedAppearanceLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="position">
    <app-type>{{ english ? 'Positions and offsets' : '位置与偏移' }}</app-type><DemoPosition />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="inline">
    <app-type>{{ english ? 'Inline and standalone' : '内联与独立展示' }}</app-type><DemoInline />
  </section>

  <section data-demo="dot">
    <app-type>{{ english ? 'Dot badges' : '小圆点' }}</app-type><DemoDot />
  </section>

  <section data-demo="max">
    <app-type>{{ english ? 'Maximum and zero' : '最大值与零值' }}</app-type><DemoMax />
  </section>

  <section data-demo="show">
    <app-type>{{ english ? 'Show and hide' : '显示与隐藏' }}</app-type><DemoShow />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="content">
    <app-type>{{ english ? 'Custom content' : '自定义内容' }}</app-type><DemoContent />
  </section>
</template>
