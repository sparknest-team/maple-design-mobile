<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ListDemo from './demos/list.vue'
import ShowBorderDemo from './demos/show-border.vue'
import ShowDescDemo from './demos/show-desc.vue'
import ShowIconDemo from './demos/show-icon.vue'

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

  <section data-demo="show-icon">
    <app-type>{{ english ? 'Show Icon' : '显示图标' }}</app-type>
    <ShowIconDemo />
  </section>

  <section data-demo="show-desc">
    <app-type>{{ english ? 'Show Description' : '显示描述' }}</app-type>
    <ShowDescDemo />
  </section>

  <section data-demo="show-border">
    <app-type>{{ english ? 'Show Border' : '显示边框' }}</app-type>
    <ShowBorderDemo />
  </section>

  <section data-demo="list">
    <app-type>{{ english ? 'Use As List Item' : '用作列表项' }}</app-type>
    <ListDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
