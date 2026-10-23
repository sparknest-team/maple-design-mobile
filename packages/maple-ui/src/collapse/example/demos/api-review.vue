<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-collapse-item-1.vue'
import Case2 from './api-review-mp-collapse-item-2.vue'

const cases = [
  { name: 'main', label: 'mp-collapse · 组合属性', component: markRaw(Case0) },
  { name: 'mp-collapse-item-1', label: 'mp-collapse-item · expand-icon', component: markRaw(Case1) },
  { name: 'mp-collapse-item-2', label: 'mp-collapse-item · extra', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
