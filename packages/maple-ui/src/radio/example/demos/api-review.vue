<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case3 from './api-review-mp-radio-1.vue'
import Case4 from './api-review-mp-radio-2.vue'
import Case5 from './api-review-mp-radio-3.vue'
import Case1 from './api-review-mp-radio-group-1.vue'
import Case2 from './api-review-mp-radio-group-2.vue'

const cases = [
  { name: 'main', label: 'mp-radio · 组合属性', component: markRaw(Case0) },
  { name: 'mp-radio-group-1', label: 'mp-radio-group · group-state', component: markRaw(Case1) },
  { name: 'mp-radio-group-2', label: 'mp-radio-group · option-data', component: markRaw(Case2) },
  { name: 'mp-radio-1', label: 'mp-radio · native-control', component: markRaw(Case3) },
  { name: 'mp-radio-2', label: 'mp-radio · set-style', component: markRaw(Case4) },
  { name: 'mp-radio-3', label: 'mp-radio · control-value', component: markRaw(Case5) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
