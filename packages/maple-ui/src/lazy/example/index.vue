<script setup>
import { computed, ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'
import BackgroundImageLazyLoadDemo from './demos/background-image-lazy-load.vue'
import BasicUsageDemo from './demos/basic-usage.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="background-image-lazy-load">
    <app-type>{{ english ? 'Background Image Lazy Load' : '背景图懒加载' }}</app-type>
    <BackgroundImageLazyLoadDemo />
  </section>
</template>
