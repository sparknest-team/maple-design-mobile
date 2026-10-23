<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-statistic-1.vue'
import Case2 from './api-review-mp-statistic-2.vue'

const cases = [
  { name: 'main', label: 'mp-statistic · 组合属性', component: markRaw(Case0) },
  { name: 'mp-statistic-1', label: 'mp-statistic · animation', component: markRaw(Case1) },
  { name: 'mp-statistic-2', label: 'mp-statistic · extra', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
