<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './api-review.vue'
import AnimationDemo from './demos/animation.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomRowsWidthDemo from './demos/custom-rows-width.vue'
import CustomTemplateDemo from './demos/custom-template.vue'
import DisplayCardDemo from './demos/display-card.vue'
import FullscreenModeDemo from './demos/fullscreen-mode.vue'

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

  <section data-demo="custom-rows-width">
    <app-type>{{ english ? 'Custom Rows Width' : '自定义段落宽度' }}</app-type>
    <CustomRowsWidthDemo />
  </section>

  <section data-demo="display-card">
    <app-type>{{ english ? 'Display Card' : '显示卡片' }}</app-type>
    <DisplayCardDemo />
  </section>

  <section data-demo="custom-template">
    <app-type>{{ english ? 'Custom Template' : '自定义模板' }}</app-type>
    <CustomTemplateDemo />
  </section>

  <section data-demo="animation">
    <app-type>{{ english ? 'Animation' : '动画' }}</app-type>
    <AnimationDemo />
  </section>

  <section data-demo="fullscreen-mode">
    <app-type>{{ english ? 'Fullscreen Mode' : '全屏模式' }}</app-type>
    <FullscreenModeDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
