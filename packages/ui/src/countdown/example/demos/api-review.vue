<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-countdown-1.vue'

const cases = [
  { name: 'main', label: 'mp-countdown · 组合属性', component: markRaw(Case0) },
  { name: 'mp-countdown-1', label: 'mp-countdown · custom-style', component: markRaw(Case1) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
