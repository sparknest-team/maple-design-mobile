<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-card-1.vue'
import Case2 from './api-review-mp-card-2.vue'
import Case3 from './api-review-mp-card-3.vue'

const cases = [
  { name: 'main', label: 'mp-card · 组合属性', component: markRaw(Case0) },
  { name: 'mp-card-1', label: 'mp-card · slots', component: markRaw(Case1) },
  { name: 'mp-card-2', label: 'mp-card · floating', component: markRaw(Case2) },
  { name: 'mp-card-3', label: 'mp-card · no-padding', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
