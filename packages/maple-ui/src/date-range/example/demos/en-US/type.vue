<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const yearRange = ref([])
const monthRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="yearRange" type="year" placeholder="Select a year range" clearable />
    <mp-date-range v-model="monthRange" type="month" placeholder="Select a month range" clearable />
  </mp-space>
</template>
