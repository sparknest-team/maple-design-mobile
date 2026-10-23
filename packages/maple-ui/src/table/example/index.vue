<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import FixedHeaderDemo from './demos/fixed-header.vue'
import SlotDemo from './demos/slot.vue'

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

  <section data-demo="slot">
    <app-type>{{ english ? 'Footer Slots' : '尾部插槽' }}</app-type>
    <SlotDemo />
  </section>

  <section data-demo="fixed-header">
    <app-type>{{ english ? 'Fixed Table Headers' : '固定表头' }}</app-type>
    <FixedHeaderDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
