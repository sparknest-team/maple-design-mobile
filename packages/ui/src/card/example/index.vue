<script setup lang="ts">
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DemoBasic from './demos/basic.vue'
import SizesAndHeadingsEn from './demos/en-US/sizes-and-headings.vue'
import DemoFloating from './demos/floating.vue'
import DemoHoverable from './demos/hoverable.vue'
import DemoImage from './demos/image.vue'
import DemoNestedTabs from './demos/nested-tabs.vue'
import DemoNoPadding from './demos/no-padding.vue'
import DemoRipple from './demos/ripple.vue'
import OrganizedSchedulerLifecycle from './demos/scheduler-lifecycle.vue'
import SizesAndHeadings from './demos/sizes-and-headings.vue'
import DemoSlots from './demos/slots.vue'
import DemoTooltipEn from './demos/en-US/tooltip.vue'
import DemoTooltip from './demos/tooltip.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="card">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage and subtitle' : '基础用法与副标题' }}</app-type
    ><DemoBasic />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="sizes-and-headings">
    <app-type>{{ english ? 'Sizes and heading levels' : '尺寸与标题层级' }}</app-type>
    <component :is="english ? SizesAndHeadingsEn : SizesAndHeadings" />
  </section>

  <section data-demo="hoverable">
    <app-type>{{ english ? 'Hover style' : '悬浮样式' }}</app-type
    ><DemoHoverable />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="image">
    <app-type>{{ english ? 'Images and directions' : '图片与三种布局' }}</app-type
    ><DemoImage />
  </section>

  <section data-demo="nested-tabs">
    <app-type>{{ english ? 'Composing Tabs and nested cards' : '组合 Tabs 与嵌套卡片' }}</app-type>
    <DemoNestedTabs />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="tooltip">
    <app-type>{{ english ? 'Long title and tooltip' : '长标题与提示' }}</app-type
    ><DemoTooltipEn v-if="english" /><DemoTooltip v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="no-padding">
    <app-type>{{ english ? 'Custom header' : '自定义标题区域' }}</app-type
    ><DemoNoPadding />
  </section>

  <section data-demo="slots">
    <app-type>{{ english ? 'Content slots' : '内容插槽' }}</app-type
    ><DemoSlots />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="ripple">
    <app-type>{{ english ? 'Ripple and click' : '水波与点击事件' }}</app-type
    ><DemoRipple />
  </section>

  <section data-demo="floating">
    <app-type>{{ english ? 'Floating and close' : '浮动展开与关闭' }}</app-type
    ><DemoFloating />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="lifecycle-and-edge-cases">
    <span lang="zh-CN">生命周期与边界</span>
    <span lang="en-US">Lifecycle and edge cases</span>
  </h2>

  <section data-demo="scheduler-lifecycle">
    <app-type>{{ english ? 'scheduler-lifecycle' : 'Floating scheduler lifecycle / 浮起调度生命周期' }}</app-type>
    <OrganizedSchedulerLifecycle />
  </section>
</template>
