<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case5 from './api-review-mp-tab-item-1.vue'
import Case4 from './api-review-mp-tab-nav-1.vue'
import Case3 from './api-review-mp-tab-pane-1.vue'
import Case1 from './api-review-mp-tabs-1.vue'
import Case2 from './api-review-mp-tabs-2.vue'
import Case7 from './api-review-mp-tabs-items-1.vue'
import Case6 from './api-review-mp-tabs-navs-1.vue'

const cases = [
  { name: 'main', label: 'mp-tabs · 组合属性', component: markRaw(Case0) },
  { name: 'mp-tabs-1', label: 'mp-tabs · custom-style', component: markRaw(Case1) },
  { name: 'mp-tabs-2', label: 'mp-tabs · scrollable', component: markRaw(Case2) },
  { name: 'mp-tab-pane-1', label: 'mp-tab-pane · basic', component: markRaw(Case3) },
  { name: 'mp-tab-nav-1', label: 'mp-tab-nav · icons-and-slots', component: markRaw(Case4) },
  { name: 'mp-tab-item-1', label: 'mp-tab-item · controlled', component: markRaw(Case5) },
  { name: 'mp-tabs-navs-1', label: 'mp-tabs-navs · navs-review', component: markRaw(Case6) },
  { name: 'mp-tabs-items-1', label: 'mp-tabs-items · controlled', component: markRaw(Case7) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
