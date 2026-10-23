<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-service.vue'

const cases = [
  { name: 'main', label: 'mp-loading-bar · 组合属性', component: markRaw(Case0) },
  { name: 'service', label: 'LoadingBar · 函数调用与返回句柄', component: markRaw(Case1) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
