<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-popover-1.vue'
import Case2 from './api-review-mp-popover-2.vue'
import Case3 from './api-review-mp-popover-3.vue'

const cases = [
  { name: 'main', label: 'mp-popover · 组合属性', component: markRaw(Case0) },
  { name: 'mp-popover-1', label: 'mp-popover · offset', component: markRaw(Case1) },
  { name: 'mp-popover-2', label: 'mp-popover · placement', component: markRaw(Case2) },
  { name: 'mp-popover-3', label: 'mp-popover · trigger', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
