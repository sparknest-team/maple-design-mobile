<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case3 from './api-review-mp-checkbox-1.vue'
import Case4 from './api-review-mp-checkbox-2.vue'
import Case1 from './api-review-mp-checkbox-group-1.vue'
import Case2 from './api-review-mp-checkbox-group-2.vue'

const cases = [
  { name: 'main', label: 'mp-checkbox · 组合属性', component: markRaw(Case0) },
  { name: 'mp-checkbox-group-1', label: 'mp-checkbox-group · group-state', component: markRaw(Case1) },
  { name: 'mp-checkbox-group-2', label: 'mp-checkbox-group · option-data', component: markRaw(Case2) },
  { name: 'mp-checkbox-1', label: 'mp-checkbox · set-style', component: markRaw(Case3) },
  { name: 'mp-checkbox-2', label: 'mp-checkbox · control-value', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
