<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-tab-bar-1.vue'
import Case2 from './api-review-mp-tab-bar-2.vue'
import Case3 from './api-review-mp-tab-bar-item-1.vue'
import Case4 from './api-review-mp-tab-bar-item-2.vue'

const cases = [
  { name: 'main', label: 'mp-tab-bar · 组合属性', component: markRaw(Case0) },
  { name: 'mp-tab-bar-1', label: 'mp-tab-bar · fab', component: markRaw(Case1) },
  { name: 'mp-tab-bar-2', label: 'mp-tab-bar · async-change', component: markRaw(Case2) },
  { name: 'mp-tab-bar-item-1', label: 'mp-tab-bar-item · show-badge', component: markRaw(Case3) },
  { name: 'mp-tab-bar-item-2', label: 'mp-tab-bar-item · custom-label', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
