<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const rangeCalendar = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="rangeCalendar" presentation="calendar" placeholder="日历日期范围" clearable />
  </mp-space>
</template>
