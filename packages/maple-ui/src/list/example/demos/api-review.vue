<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-list-1.vue'
import Case2 from './api-review-mp-list-2.vue'

const cases = [
  { name: 'main', label: 'mp-list · 组合属性', component: markRaw(Case0) },
  { name: 'mp-list-1', label: 'mp-list · bounded-scroll', component: markRaw(Case1) },
  { name: 'mp-list-2', label: 'mp-list · virtual-lifecycle', component: markRaw(Case2) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
