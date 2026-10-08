<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicDemo from './demos/basic-usage.vue'
import ContentDemo from './demos/custom-content.vue'
import PositionDemo from './demos/custom-position.vue'
import BasicEnDemo from './demos/en-US/basic-usage.vue'
import ContentEnDemo from './demos/en-US/custom-content.vue'
import PositionEnDemo from './demos/en-US/custom-position.vue'
import TargetEnDemo from './demos/en-US/target-container.vue'
import TargetDemo from './demos/target-container.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <component :is="english ? BasicEnDemo : BasicDemo" />
  </section>

  <section data-demo="target-container">
    <app-type>{{ english ? 'Switch scroll container' : '切换滚动容器' }}</app-type>
    <component :is="english ? TargetEnDemo : TargetDemo" />
  </section>

  <section data-demo="custom-position">
    <app-type>{{ english ? 'Custom position' : '自定义位置' }}</app-type>
    <component :is="english ? PositionEnDemo : PositionDemo" />
  </section>

  <section data-demo="custom-content">
    <app-type>{{ english ? 'Content and events' : '自定义内容与事件' }}</app-type>
    <component :is="english ? ContentEnDemo : ContentDemo" />
  </section>
</template>
