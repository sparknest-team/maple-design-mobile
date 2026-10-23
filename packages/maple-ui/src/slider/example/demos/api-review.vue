<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-slider-1.vue'
import Case2 from './api-review-mp-slider-2.vue'

const cases = [
  { name: 'main', label: 'mp-slider · 组合属性', component: markRaw(Case0) },
  { name: 'mp-slider-1', label: 'mp-slider · controlled-range', component: markRaw(Case1) },
  { name: 'mp-slider-2', label: 'mp-slider · keyboard-input', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
