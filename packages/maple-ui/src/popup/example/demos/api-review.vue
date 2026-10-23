<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-popup-1.vue'

const cases = [
  { name: 'main', label: 'mp-popup · 组合属性', component: markRaw(Case0) },
  { name: 'mp-popup-1', label: 'mp-popup · overlay-style', component: markRaw(Case1) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
