<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-pagination-1.vue'
import Case2 from './api-review-mp-pagination-2.vue'
import Case3 from './api-review-mp-pagination-3.vue'
import Case4 from './api-review-mp-pagination-4.vue'

const cases = [
  { name: 'main', label: 'mp-pagination · 组合属性', component: markRaw(Case0) },
  { name: 'mp-pagination-1', label: 'mp-pagination · custom-page-button', component: markRaw(Case1) },
  { name: 'mp-pagination-2', label: 'mp-pagination · show-jumper', component: markRaw(Case2) },
  { name: 'mp-pagination-3', label: 'mp-pagination · show-page-size', component: markRaw(Case3) },
  { name: 'mp-pagination-4', label: 'mp-pagination · show-total', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
