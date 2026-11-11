<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-menu-1.vue'
import Case2 from './api-review-mp-menu-2.vue'
import Case3 from './api-review-mp-menu-option-1.vue'

const cases = [
  { name: 'main', label: 'mp-menu · 组合属性', component: markRaw(Case0) },
  { name: 'mp-menu-1', label: 'mp-menu · positioning', component: markRaw(Case1) },
  { name: 'mp-menu-2', label: 'mp-menu · placement', component: markRaw(Case2) },
  { name: 'mp-menu-option-1', label: 'mp-menu-option · context-menu', component: markRaw(Case3) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
