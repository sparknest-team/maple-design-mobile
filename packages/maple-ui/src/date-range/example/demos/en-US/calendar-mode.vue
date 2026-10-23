<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const rangeCalendar = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="rangeCalendar" panel-type="calendar" placeholder="Calendar date range" clearable />
  </mp-space>
</template>
