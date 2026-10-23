<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-date-range-1.vue'
import Case2 from './api-review-mp-date-range-2.vue'
import Case3 from './api-review-mp-date-range-3.vue'
import Case4 from './api-review-mp-date-range-picker-1.vue'

const cases = [
  { name: 'main', label: 'mp-date-range · 组合属性', component: markRaw(Case0) },
  { name: 'mp-date-range-1', label: 'mp-date-range · boundaries', component: markRaw(Case1) },
  { name: 'mp-date-range-2', label: 'mp-date-range · entry-boundary', component: markRaw(Case2) },
  { name: 'mp-date-range-3', label: 'mp-date-range · text-entry', component: markRaw(Case3) },
  { name: 'mp-date-range-picker-1', label: 'mp-date-range-picker · entry-boundary', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
