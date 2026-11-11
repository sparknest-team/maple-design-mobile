<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-auto-complete-1.vue'
import Case2 from './api-review-mp-auto-complete-2.vue'
import Case3 from './api-review-mp-auto-complete-3.vue'
import Case4 from './api-review-mp-auto-complete-4.vue'
import Case5 from './api-review-mp-auto-complete-5.vue'
import Case6 from './api-review-mp-auto-complete-6.vue'

const cases = [
  { name: 'main', label: 'mp-auto-complete · 组合属性', component: markRaw(Case0) },
  { name: 'mp-auto-complete-1', label: 'mp-auto-complete · decorator', component: markRaw(Case1) },
  { name: 'mp-auto-complete-2', label: 'mp-auto-complete · footer', component: markRaw(Case2) },
  { name: 'mp-auto-complete-3', label: 'mp-auto-complete · group-spacing', component: markRaw(Case3) },
  { name: 'mp-auto-complete-4', label: 'mp-auto-complete · opening-policy', component: markRaw(Case4) },
  { name: 'mp-auto-complete-5', label: 'mp-auto-complete · virtual-list', component: markRaw(Case5) },
  { name: 'mp-auto-complete-6', label: 'mp-auto-complete · accessibility', component: markRaw(Case6) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
