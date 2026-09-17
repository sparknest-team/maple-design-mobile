<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import CircleDemo from './demos/circle.vue'
import IndeterminateProgressDemo from './demos/indeterminate-progress.vue'
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
</template>
