<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-search-1.vue'
import Case2 from './api-review-mp-search-2.vue'

const cases = [
  { name: 'main', label: 'mp-search · 组合属性', component: markRaw(Case0) },
  { name: 'mp-search-1', label: 'mp-search · presentation', component: markRaw(Case1) },
  { name: 'mp-search-2', label: 'mp-search · fields', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
