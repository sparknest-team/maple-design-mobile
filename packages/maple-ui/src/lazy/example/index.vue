<script setup>
import { computed, ref } from 'vue'
import { AppType, watchLang } from '@maple-design/cli/client'
import BackgroundImageLazyLoadDemo from './demos/background-image-lazy-load.vue'
import BasicUsageDemo from './demos/basic-usage.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="lazy">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="background-image-lazy-load">
    <app-type>{{ english ? 'Background Image Lazy Load' : '背景图懒加载' }}</app-type>
    <BackgroundImageLazyLoadDemo />
  </section>
</template>
