<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomContentDemo from './demos/custom-content.vue'
import CustomPositionDemo from './demos/custom-position.vue'
import TargetContainerDemo from './demos/target-container.vue'

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

  <section data-demo="target-container">
    <app-type>{{ english ? 'Target Container' : '指定滚动容器' }}</app-type>
    <TargetContainerDemo />
  </section>

  <section data-demo="custom-position">
    <app-type>{{ english ? 'Custom Position' : '自定义位置' }}</app-type>
    <CustomPositionDemo />
  </section>

  <section data-demo="custom-content">
    <app-type>{{ english ? 'Custom Content' : '自定义内容' }}</app-type>
    <CustomContentDemo />
  </section>
</template>
