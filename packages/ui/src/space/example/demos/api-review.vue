<script setup>
import { markRaw } from 'vue'
import DemoApiReviewSuite from '../../../../docs/components/ApiReviewSuite.vue'
import Case0 from './api-review-main.vue'

const cases = [{ name: 'main', label: 'mp-space · 组合属性', component: markRaw(Case0) }]
</script>
<template><DemoApiReviewSuite :cases="cases" /></template>
