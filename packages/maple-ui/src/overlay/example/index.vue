<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import ClickEventDemo from './demos/click-event.vue'
import OverlayBaseDemo from './demos/overlay-base.vue'
import OverlayContentDemo from './demos/overlay-content.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="overlay-base">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <OverlayBaseDemo />
  </section>

  <section data-demo="overlay-content">
    <app-type>{{ english ? 'Overlay Content' : '嵌入内容' }}</app-type>
    <OverlayContentDemo />
  </section>

  <section data-demo="click-event">
    <app-type>{{ english ? 'Click Event' : '点击事件' }}</app-type>
    <ClickEventDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
