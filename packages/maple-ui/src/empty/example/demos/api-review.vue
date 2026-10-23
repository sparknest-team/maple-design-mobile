<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-empty-1.vue'
import Case2 from './api-review-mp-empty-2.vue'
import Case3 from './api-review-mp-empty-3.vue'

const cases = [
  { name: 'main', label: 'mp-empty · 组合属性', component: markRaw(Case0) },
  { name: 'mp-empty-1', label: 'mp-empty · custom-image', component: markRaw(Case1) },
  { name: 'mp-empty-2', label: 'mp-empty · extra-slot', component: markRaw(Case2) },
  { name: 'mp-empty-3', label: 'mp-empty · image-size', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
