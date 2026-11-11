<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case4 from './../api-review-mp-time-picker-1.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-time-1.vue'
import Case2 from './api-review-mp-time-2.vue'
import Case3 from './api-review-mp-time-3.vue'

const cases = [
  { name: 'main', label: 'mp-time · 组合属性', component: markRaw(Case0) },
  { name: 'mp-time-1', label: 'mp-time · step', component: markRaw(Case1) },
  { name: 'mp-time-2', label: 'mp-time · wheel-limits', component: markRaw(Case2) },
  { name: 'mp-time-3', label: 'mp-time · default-state', component: markRaw(Case3) },
  { name: 'mp-time-picker-1', label: 'mp-time-picker · picker', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
