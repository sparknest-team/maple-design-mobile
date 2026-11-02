<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="overlay">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="overlay-base">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <OverlayBaseDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="overlay-content">
    <app-type>{{ english ? 'Overlay Content' : '嵌入内容' }}</app-type>
    <OverlayContentDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="click-event">
    <app-type>{{ english ? 'Click Event' : '点击事件' }}</app-type>
    <ClickEventDemo />
  </section>
</template>
