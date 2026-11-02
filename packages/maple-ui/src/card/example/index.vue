<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DemoBasic from './demos/basic.vue'
import DemoFloating from './demos/floating.vue'
import DemoHoverable from './demos/hoverable.vue'
import DemoImage from './demos/image.vue'
import DemoNoPadding from './demos/no-padding.vue'
import DemoRipple from './demos/ripple.vue'
import OrganizedSchedulerLifecycle from './demos/scheduler-lifecycle.vue'
import DemoSlots from './demos/slots.vue'
import DemoTooltip from './demos/tooltip.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
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

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="tooltip">
    <app-type>{{ english ? 'Long title and tooltip' : '长标题与提示' }}</app-type
    ><DemoTooltip />
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
    <app-type>{{ english ? 'Floating and close' : '全屏展开与关闭' }}</app-type
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
