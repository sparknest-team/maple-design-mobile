<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-tooltip-1.vue'
import Case2 from './api-review-mp-tooltip-2.vue'
import Case3 from './api-review-mp-tooltip-3.vue'
import Case4 from './api-review-mp-tooltip-4.vue'

const cases = [
  { name: 'main', label: 'mp-tooltip · 组合属性', component: markRaw(Case0) },
  { name: 'mp-tooltip-1', label: 'mp-tooltip · content-slot', component: markRaw(Case1) },
  { name: 'mp-tooltip-2', label: 'mp-tooltip · offset', component: markRaw(Case2) },
  { name: 'mp-tooltip-3', label: 'mp-tooltip · placement', component: markRaw(Case3) },
  { name: 'mp-tooltip-4', label: 'mp-tooltip · trigger', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
