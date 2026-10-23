<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-infinite-scroll-1.vue'
import Case2 from './api-review-mp-infinite-scroll-2.vue'

const cases = [
  { name: 'main', label: 'mp-infinite-scroll · 组合属性', component: markRaw(Case0) },
  { name: 'mp-infinite-scroll-1', label: 'mp-infinite-scroll · custom-status', component: markRaw(Case1) },
  { name: 'mp-infinite-scroll-2', label: 'mp-infinite-scroll · error', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
