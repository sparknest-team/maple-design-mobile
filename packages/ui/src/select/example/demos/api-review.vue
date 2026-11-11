<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'
import Case5 from './api-review-mp-optgroup-1.vue'
import Case4 from './api-review-mp-option-1.vue'
import Case1 from './api-review-mp-select-1.vue'
import Case2 from './api-review-mp-select-2.vue'
import Case3 from './api-review-mp-select-3.vue'

const cases = [
  { name: 'main', label: 'mp-select · 组合属性', component: markRaw(Case0) },
  { name: 'mp-select-1', label: 'mp-select · slots-review', component: markRaw(Case1) },
  { name: 'mp-select-2', label: 'mp-select · custom-icons', component: markRaw(Case2) },
  { name: 'mp-select-3', label: 'mp-select · thumb-lifecycle', component: markRaw(Case3) },
  { name: 'mp-option-1', label: 'mp-option · options-review', component: markRaw(Case4) },
  { name: 'mp-optgroup-1', label: 'mp-optgroup · options-review', component: markRaw(Case5) },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
