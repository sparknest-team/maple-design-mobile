<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-breadcrumb-1.vue'
import Case2 from './api-review-mp-breadcrumb-2.vue'
import Case3 from './api-review-mp-breadcrumb-3.vue'
import Case4 from './api-review-mp-breadcrumb-item-1.vue'

const cases = [
  { name: 'main', label: 'mp-breadcrumb · 组合属性', component: markRaw(Case0) },
  { name: 'mp-breadcrumb-1', label: 'mp-breadcrumb · max-count', component: markRaw(Case1) },
  { name: 'mp-breadcrumb-2', label: 'mp-breadcrumb · routes-mode', component: markRaw(Case2) },
  { name: 'mp-breadcrumb-3', label: 'mp-breadcrumb · separator-slot', component: markRaw(Case3) },
  { name: 'mp-breadcrumb-item-1', label: 'mp-breadcrumb-item · dropdown', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
