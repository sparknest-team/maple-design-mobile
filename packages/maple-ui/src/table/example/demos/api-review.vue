<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-table-1.vue'

const cases = [
  { name: 'main', label: 'mp-table · 组合属性', component: markRaw(Case0) },
  { name: 'mp-table-1', label: 'mp-table · fixed-header', component: markRaw(Case1) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
