<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-input-1.vue'
import Case2 from './api-review-mp-input-2.vue'
import Case3 from './api-review-mp-input-3.vue'
import Case4 from './api-review-mp-input-4.vue'

const cases = [
  { name: 'main', label: 'mp-input · 组合属性', component: markRaw(Case0) },
  { name: 'mp-input-1', label: 'mp-input · native-attrs', component: markRaw(Case1) },
  { name: 'mp-input-2', label: 'mp-input · prefix-suffix', component: markRaw(Case2) },
  { name: 'mp-input-3', label: 'mp-input · custom-clear-icon', component: markRaw(Case3) },
  { name: 'mp-input-4', label: 'mp-input · max-length', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
