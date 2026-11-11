<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-skeleton-1.vue'
import Case2 from './api-review-mp-skeleton-2.vue'

const cases = [
  { name: 'main', label: 'mp-skeleton · 组合属性', component: markRaw(Case0) },
  { name: 'mp-skeleton-1', label: 'mp-skeleton · CustomTemplate', component: markRaw(Case1) },
  { name: 'mp-skeleton-2', label: 'mp-skeleton · TitleAndRows', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
