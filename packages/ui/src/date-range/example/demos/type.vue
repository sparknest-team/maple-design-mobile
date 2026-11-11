<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const yearRange = ref([])
const monthRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="yearRange" type="year" placeholder="选择年范围" clearable />
    <mp-date-range v-model="monthRange" type="month" placeholder="选择月范围" clearable />
  </mp-space>
</template>
