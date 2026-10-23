<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-fab-1.vue'
import Case2 from './api-review-mp-fab-2.vue'

const cases = [
  { name: 'main', label: 'mp-fab · 组合属性', component: markRaw(Case0) },
  { name: 'mp-fab-1', label: 'mp-fab · custom-trigger', component: markRaw(Case1) },
  { name: 'mp-fab-2', label: 'mp-fab · drag', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
