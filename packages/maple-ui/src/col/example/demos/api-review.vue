<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-col-1.vue'

const cases = [
  { name: 'main', label: 'mp-col · 组合属性', component: markRaw(Case0) },
  { name: 'mp-col-1', label: 'mp-col · responsive', component: markRaw(Case1) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
