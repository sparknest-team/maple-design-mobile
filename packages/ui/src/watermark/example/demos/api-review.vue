<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-watermark-1.vue'
import Case2 from './api-review-mp-watermark-2.vue'

const cases = [
  { name: 'main', label: 'mp-watermark · 组合属性', component: markRaw(Case0) },
  { name: 'mp-watermark-1', label: 'mp-watermark · custom-offset', component: markRaw(Case1) },
  { name: 'mp-watermark-2', label: 'mp-watermark · image-watermark', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
