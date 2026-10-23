<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-form-1.vue'
import Case2 from './api-review-mp-form-2.vue'
import Case3 from './api-review-mp-form-item-1.vue'
import Case4 from './api-review-mp-form-item-2.vue'

const cases = [
  { name: 'main', label: 'mp-form · 组合属性', component: markRaw(Case0) },
  { name: 'mp-form-1', label: 'mp-form · label-columns', component: markRaw(Case1) },
  { name: 'mp-form-2', label: 'mp-form · presentation-state', component: markRaw(Case2) },
  { name: 'mp-form-item-1', label: 'mp-form-item · async-fields', component: markRaw(Case3) },
  { name: 'mp-form-item-2', label: 'mp-form-item · decoration', component: markRaw(Case4) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
