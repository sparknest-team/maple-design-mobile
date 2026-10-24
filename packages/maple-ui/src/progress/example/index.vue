<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import AdvancedDemo from './demos/advanced.vue'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CircleDemo from './demos/circle.vue'
import IndeterminateProgressDemo from './demos/indeterminate-progress.vue'
import LoopDemo from './demos/loop.vue'
import SizeDemo from './demos/size.vue'
import StatusDemo from './demos/status.vue'
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
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'basic-usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="status">
    <app-type>{{ english ? 'status' : '八种状态' }}</app-type
    ><StatusDemo />
  </section>

  <section data-demo="size">
    <app-type>{{ english ? 'size' : '五档与自定义尺寸' }}</app-type
    ><SizeDemo />
  </section>

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
  <section data-demo="advanced">
    <app-type>{{ english ? 'advanced' : '渐变、起点、隐藏轨道与文本' }}</app-type
    ><AdvancedDemo />
  </section>
  <section data-demo="style">
    <app-type>{{ english ? 'More styles and indeterminate progress' : '更多样式与不确定进度' }}</app-type>
    <StyleDemo />
  </section>
  <section data-demo="indeterminate-progress">
    <app-type>{{ english ? 'More styles and indeterminate progress' : '更多样式与不确定进度' }}</app-type>
    <IndeterminateProgressDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
