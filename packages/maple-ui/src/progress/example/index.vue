<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AdvancedDemo from './demos/advanced.vue'
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
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="style">
    <app-type>{{ english ? 'Other Style' : '其他样式' }}</app-type>
    <StyleDemo />
  </section>

  <section data-demo="circle">
    <app-type>{{ english ? 'Circle Progress' : '环形进度条' }}</app-type>
    <CircleDemo />
  </section>

  <section data-demo="indeterminate-progress">
    <app-type>{{ english ? 'Indeterminate Animation' : '不间断动画' }}</app-type>
    <IndeterminateProgressDemo />
  </section>
  <section data-demo="status"><app-type>status</app-type><StatusDemo /></section>
  <section data-demo="size"><app-type>size</app-type><SizeDemo /></section>
  <section data-demo="step"><app-type>step</app-type><StepDemo /></section>
  <section data-demo="loop"><app-type>loop</app-type><LoopDemo /></section>
  <section data-demo="advanced"><app-type>advanced</app-type><AdvancedDemo /></section>
</template>
