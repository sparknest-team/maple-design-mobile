<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case3 from './../api-review-mp-date-picker-1.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-date-1.vue'
import Case2 from './api-review-mp-date-2.vue'
import Case4 from './api-review-mp-date-picker-2.vue'
import Case5 from './api-review-mp-date-picker-3.vue'

const cases = [
  { name: 'main', label: 'mp-date · 组合属性', component: markRaw(Case0) },
  { name: 'mp-date-1', label: 'mp-date · entry-boundary', component: markRaw(Case1) },
  { name: 'mp-date-2', label: 'mp-date · text-entry', component: markRaw(Case2) },
  { name: 'mp-date-picker-1', label: 'mp-date-picker · picker', component: markRaw(Case3) },
  { name: 'mp-date-picker-2', label: 'mp-date-picker · time-presentation', component: markRaw(Case4) },
  { name: 'mp-date-picker-3', label: 'mp-date-picker · entry-boundary', component: markRaw(Case5) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
