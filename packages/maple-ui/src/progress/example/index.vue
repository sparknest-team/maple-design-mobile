<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import AdvancedDemo from './demos/advanced.vue'
import ContentAppearanceComparison from './demos/appearance-comparison.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CircleDemo from './demos/circle.vue'
import IndeterminateProgressDemo from './demos/indeterminate-progress.vue'
import LoopDemo from './demos/loop.vue'
import StepDemo from './demos/step.vue'
import StyleDemo from './demos/style.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="progress">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'basic-usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">进度尺寸与状态</span><span lang="en-US">Progress sizes and states</span>
    </h3>
    <ContentAppearanceComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="circle">
    <app-type>{{ english ? 'circle' : '环形进度' }}</app-type>
    <CircleDemo />
  </section>

  <section data-demo="step">
    <app-type>{{ english ? 'step' : '分段进度' }}</app-type
    ><StepDemo />
  </section>

  <section data-demo="loop">
    <app-type>{{ english ? 'loop' : '不确定进度与动画' }}</app-type
    ><LoopDemo />
  </section>

  <section data-demo="indeterminate-progress">
    <app-type>{{ english ? 'More styles and indeterminate progress' : '更多样式与不确定进度' }}</app-type>
    <IndeterminateProgressDemo />
  </section>

  <section data-demo="advanced">
    <app-type>{{ english ? 'advanced' : '渐变、起点、隐藏轨道与文本' }}</app-type
    ><AdvancedDemo />
  </section>

  <section data-demo="style">
    <app-type>{{ english ? 'More styles and indeterminate progress' : '更多样式与不确定进度' }}</app-type>
    <StyleDemo />
  </section>
</template>
