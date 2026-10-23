<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case1 from './api-review-mp-image-1.vue'
import Case2 from './api-review-mp-image-2.vue'
import Case3 from './api-review-mp-image-3.vue'
import Case4 from './api-review-mp-image-4.vue'
import Case5 from './api-review-mp-image-5.vue'
import Case6 from './api-review-mp-image-preview-1.vue'
import Case7 from './api-review-mp-image-preview-group-1.vue'
import Case8 from './api-review-service.vue'

const cases = [
  { name: 'main', label: 'mp-image · 组合属性', component: markRaw(Case0) },
  { name: 'mp-image-1', label: 'mp-image · error', component: markRaw(Case1) },
  { name: 'mp-image-2', label: 'mp-image · extra', component: markRaw(Case2) },
  { name: 'mp-image-3', label: 'mp-image · hide-footer-never', component: markRaw(Case3) },
  { name: 'mp-image-4', label: 'mp-image · loader', component: markRaw(Case4) },
  { name: 'mp-image-5', label: 'mp-image · overlay-closable', component: markRaw(Case5) },
  { name: 'mp-image-preview-1', label: 'mp-image-preview · controller-lifecycle', component: markRaw(Case6) },
  {
    name: 'mp-image-preview-group-1',
    label: 'mp-image-preview-group · component-preview-group',
    component: markRaw(Case7),
  },
  { name: 'service', label: 'imagePreview · 函数调用与返回句柄', component: markRaw(Case8) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
