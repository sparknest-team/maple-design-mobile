<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicDemo from './demos/basic.vue'
import ControlledDemo from './demos/controlled.vue'
import PlacementDemo from './demos/placement.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>
  <section data-demo="placement">
    <app-type>{{ english ? 'Placement and arrow' : '方位与箭头' }}</app-type>
    <PlacementDemo />
  </section>
  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled state and offset' : '受控状态与偏移' }}</app-type>
    <ControlledDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
