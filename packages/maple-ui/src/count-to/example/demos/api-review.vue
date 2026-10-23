<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-count-to-1.vue'
import Case2 from './api-review-mp-count-to-2.vue'

const cases = [
  { name: 'main', label: 'mp-count-to · 组合属性', component: markRaw(Case0) },
  { name: 'mp-count-to-1', label: 'mp-count-to · custom-animation-curve', component: markRaw(Case1) },
  { name: 'mp-count-to-2', label: 'mp-count-to · custom-style', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
