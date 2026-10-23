<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ClickEventDemo from './demos/click-event.vue'
import CustomIconDemo from './demos/custom-icon.vue'
import DropdownDemo from './demos/dropdown.vue'
import MaxCountDemo from './demos/max-count.vue'
import RoutesModeDemo from './demos/routes-mode.vue'
import SeparatorDemo from './demos/separator.vue'

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

  <section data-demo="separator">
    <app-type>{{ english ? 'Custom Separator' : '自定义分隔符' }}</app-type>
    <SeparatorDemo />
  </section>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom Icon' : '自定义图标' }}</app-type>
    <CustomIconDemo />
  </section>

  <section data-demo="routes-mode">
    <app-type>{{ english ? 'Route Configuration' : '参数化配置' }}</app-type>
    <RoutesModeDemo />
  </section>

  <section data-demo="dropdown">
    <app-type>{{ english ? 'Dropdown' : '下拉菜单' }}</app-type>
    <DropdownDemo />
  </section>

  <section data-demo="max-count">
    <app-type>{{ english ? 'Max Count' : '显示省略' }}</app-type>
    <MaxCountDemo />
  </section>

  <section data-demo="click-event">
    <app-type>{{ english ? 'Link & Click' : '链接与点击' }}</app-type>
    <ClickEventDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
