<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-swipe-cell-1.vue'
import Case2 from './api-review-mp-swipe-cell-2.vue'

const cases = [
  { name: 'main', label: 'mp-swipe-cell · 组合属性', component: markRaw(Case0) },
  { name: 'mp-swipe-cell-1', label: 'mp-swipe-cell · before-close', component: markRaw(Case1) },
  { name: 'mp-swipe-cell-2', label: 'mp-swipe-cell · both-sides', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
