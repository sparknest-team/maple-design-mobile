<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-rate-1.vue'
import Case2 from './api-review-mp-rate-2.vue'

const cases = [
  { name: 'main', label: 'mp-rate · 组合属性', component: markRaw(Case0) },
  { name: 'mp-rate-1', label: 'mp-rate · half-star', component: markRaw(Case1) },
  { name: 'mp-rate-2', label: 'mp-rate · sizes-and-symbols.en-US', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
