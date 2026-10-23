<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-carousel-1.vue'
import Case2 from './api-review-mp-carousel-2.vue'
import Case3 from './api-review-mp-carousel-3.vue'

const cases = [
  { name: 'main', label: 'mp-carousel · 组合属性', component: markRaw(Case0) },
  { name: 'mp-carousel-1', label: 'mp-carousel · auto-sized', component: markRaw(Case1) },
  { name: 'mp-carousel-2', label: 'mp-carousel · autoplay-hover-pause', component: markRaw(Case2) },
  { name: 'mp-carousel-3', label: 'mp-carousel · custom-indicator', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
