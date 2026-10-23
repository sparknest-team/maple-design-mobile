<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-upload-1.vue'
import Case2 from './api-review-mp-upload-2.vue'
import Case3 from './api-review-mp-upload-3.vue'
import Case4 from './api-review-mp-upload-4.vue'
import Case5 from './api-review-mp-upload-5.vue'

const cases = [
  { name: 'main', label: 'mp-upload · 组合属性', component: markRaw(Case0) },
  { name: 'mp-upload-1', label: 'mp-upload · before-add', component: markRaw(Case1) },
  { name: 'mp-upload-2', label: 'mp-upload · before-read', component: markRaw(Case2) },
  { name: 'mp-upload-3', label: 'mp-upload · before-remove', component: markRaw(Case3) },
  { name: 'mp-upload-4', label: 'mp-upload · click-action', component: markRaw(Case4) },
  { name: 'mp-upload-5', label: 'mp-upload · queue-request', component: markRaw(Case5) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
