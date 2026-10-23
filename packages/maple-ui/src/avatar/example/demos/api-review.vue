<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-avatar-1.vue'
import Case2 from './api-review-mp-avatar-2.vue'
import Case3 from './api-review-mp-avatar-group-1.vue'

const cases = [
  { name: 'main', label: 'mp-avatar · 组合属性', component: markRaw(Case0) },
  { name: 'mp-avatar-1', label: 'mp-avatar · fallback', component: markRaw(Case1) },
  { name: 'mp-avatar-2', label: 'mp-avatar · trigger', component: markRaw(Case2) },
  { name: 'mp-avatar-group-1', label: 'mp-avatar-group · group-vertical', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
