<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ManualUsageDemo from './demos/manual-usage.vue'
import StatesDemo from './demos/states.vue'

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

  <section data-demo="manual-usage">
    <app-type>{{ english ? 'Default Slot' : '默认插槽' }}</app-type>
    <ManualUsageDemo />
  </section>

  <section data-demo="states">
    <app-type>{{ english ? 'Loading and Empty' : '加载与空态' }}</app-type>
    <StatesDemo />
  </section>
</template>
