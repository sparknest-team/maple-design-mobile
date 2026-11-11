<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-progress-1.vue'
import Case2 from './api-review-mp-progress-2.vue'

const cases = [
  { name: 'main', label: 'mp-progress · 组合属性', component: markRaw(Case0) },
  { name: 'mp-progress-1', label: 'mp-progress · advanced', component: markRaw(Case1) },
  { name: 'mp-progress-2', label: 'mp-progress · circle', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
