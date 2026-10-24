<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomAnimationCurveDemo from './demos/custom-animation-curve.vue'
import CustomDurationDemo from './demos/custom-duration.vue'
import CustomStyleDemo from './demos/custom-style.vue'
import ManualControlDemo from './demos/manual-control.vue'
import PrecisionDemo from './demos/precision.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="precision">
    <app-type>{{ english ? 'Precision' : '精度' }}</app-type>
    <PrecisionDemo />
  </section>

  <section data-demo="custom-duration">
    <app-type>{{ english ? 'Custom Duration' : '自定义时长' }}</app-type>
    <CustomDurationDemo />
  </section>

  <section data-demo="custom-style">
    <app-type>{{ english ? 'Custom Styles' : '自定义样式' }}</app-type>
    <CustomStyleDemo />
  </section>

  <section data-demo="custom-animation-curve">
    <app-type>{{ english ? 'Custom Animation Curve' : '自定义动画曲线' }}</app-type>
    <CustomAnimationCurveDemo />
  </section>

  <section data-demo="manual-control">
    <app-type>{{ english ? 'Manual Control' : '手动控制' }}</app-type>
    <ManualControlDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
