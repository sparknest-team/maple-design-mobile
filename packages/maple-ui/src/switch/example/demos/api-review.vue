<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-switch-1.vue'
import Case2 from './api-review-mp-switch-2.vue'
import Case3 from './api-review-mp-switch-3.vue'
import Case4 from './api-review-mp-switch-4.vue'

const cases = [
  { name: 'main', label: 'mp-switch · 组合属性', component: markRaw(Case0) },
  { name: 'mp-switch-1', label: 'mp-switch · custom-icon', component: markRaw(Case1) },
  { name: 'mp-switch-2', label: 'mp-switch · custom-text', component: markRaw(Case2) },
  { name: 'mp-switch-3', label: 'mp-switch · custom-value', component: markRaw(Case3) },
  { name: 'mp-switch-4', label: 'mp-switch · switch-interception', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
