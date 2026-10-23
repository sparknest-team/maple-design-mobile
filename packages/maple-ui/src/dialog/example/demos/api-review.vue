<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-dialog-1.vue'
import Case2 from './api-review-mp-dialog-2.vue'
import Case3 from './api-review-mp-dialog-3.vue'
import Case4 from './api-review-service.vue'

const cases = [
  { name: 'main', label: 'mp-dialog · 组合属性', component: markRaw(Case0) },
  { name: 'mp-dialog-1', label: 'mp-dialog · custom-footer', component: markRaw(Case1) },
  { name: 'mp-dialog-2', label: 'mp-dialog · advanced-props', component: markRaw(Case2) },
  { name: 'mp-dialog-3', label: 'mp-dialog · async-close', component: markRaw(Case3) },
  { name: 'service', label: 'Dialog · 函数调用与返回句柄', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
