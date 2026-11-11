<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-split-button-1.vue'
import Case2 from './api-review-mp-split-button-2.vue'
import Case3 from './api-review-mp-split-button-3.vue'

const cases = [
  { name: 'main', label: 'mp-split-button · 组合属性', component: markRaw(Case0) },
  { name: 'mp-split-button-1', label: 'mp-split-button · disabled', component: markRaw(Case1) },
  { name: 'mp-split-button-2', label: 'mp-split-button · custom-icon', component: markRaw(Case2) },
  { name: 'mp-split-button-3', label: 'mp-split-button · variants', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
