<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import DemoBasic from './demos/basic.vue'
import DemoBottom from './demos/bottom.vue'
import DemoContainer from './demos/container.vue'
import DemoControls from './demos/controls.vue'
import DemoFixChange from './demos/fix-change.vue'
import DemoTop from './demos/top.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type
    ><DemoBasic />
  </section>
  <section data-demo="top">
    <app-type>{{ english ? 'Top offset' : '顶部偏移' }}</app-type
    ><DemoTop />
  </section>
  <section data-demo="bottom">
    <app-type>{{ english ? 'Bottom offset' : '底部偏移' }}</app-type
    ><DemoBottom />
  </section>
  <section data-demo="container">
    <app-type>{{ english ? 'Scroll container' : '指定滚动容器' }}</app-type
    ><DemoContainer />
  </section>
  <section data-demo="fix-change">
    <app-type>{{ english ? 'Change event' : '吸附状态变化' }}</app-type
    ><DemoFixChange />
  </section>
  <section data-demo="controls">
    <app-type>{{ english ? 'Disabled, CSS mode and manual update' : '禁用、CSS 模式与手动更新' }}</app-type>
    <DemoControls />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
