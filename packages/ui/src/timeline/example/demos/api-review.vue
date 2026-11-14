<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case1 from './api-review-c-timeline-1.vue'
import Case2 from './api-review-c-timeline-2.vue'
import Case3 from './api-review-c-timeline-item-1.vue'
import Case4 from './api-review-c-timeline-item-2.vue'
import Case5 from './api-review-c-timeline-item-3.vue'
import Case0 from './api-review-main.vue'

const cases = [
  { name: 'main', label: 'c-timeline · 组合属性', component: markRaw(Case0) },
  {
    name: 'c-timeline-1',
    label: 'c-timeline · direction',
    component: markRaw(Case1),
  },
  {
    name: 'c-timeline-2',
    label: 'c-timeline · pending',
    component: markRaw(Case2),
  },
  {
    name: 'c-timeline-item-1',
    label: 'c-timeline-item · custom',
    component: markRaw(Case3),
  },
  {
    name: 'c-timeline-item-2',
    label: 'c-timeline-item · dot',
    component: markRaw(Case4),
  },
  {
    name: 'c-timeline-item-3',
    label: 'c-timeline-item · label',
    component: markRaw(Case5),
  },
]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
