<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case4 from './../api-review-mp-time-range-picker-1.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-time-range-1.vue'
import Case2 from './api-review-mp-time-range-2.vue'
import Case3 from './api-review-mp-time-range-3.vue'
import Case5 from './api-review-mp-time-range-picker-2.vue'

const cases = [
  { name: 'main', label: 'mp-time-range · 组合属性', component: markRaw(Case0) },
  { name: 'mp-time-range-1', label: 'mp-time-range · wheel-limits', component: markRaw(Case1) },
  { name: 'mp-time-range-2', label: 'mp-time-range · default-state', component: markRaw(Case2) },
  { name: 'mp-time-range-3', label: 'mp-time-range · step', component: markRaw(Case3) },
  { name: 'mp-time-range-picker-1', label: 'mp-time-range-picker · picker', component: markRaw(Case4) },
  { name: 'mp-time-range-picker-2', label: 'mp-time-range-picker · panel-behavior', component: markRaw(Case5) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
