<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-alert-1.vue'
import Case2 from './api-review-mp-alert-2.vue'
import Case3 from './api-review-mp-alert-3.vue'

const cases = [
  { name: 'main', label: 'mp-alert · 组合属性', component: markRaw(Case0) },
  { name: 'mp-alert-1', label: 'mp-alert · variant', component: markRaw(Case1) },
  { name: 'mp-alert-2', label: 'mp-alert · custom-close-icon', component: markRaw(Case2) },
  { name: 'mp-alert-3', label: 'mp-alert · custom-icon', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
