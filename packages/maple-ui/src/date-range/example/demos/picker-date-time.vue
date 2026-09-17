<script setup>
import { ref } from 'vue'

const clock = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
const calendarPicker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
const picker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
</script>

<template>
  <mp-date-range-picker v-model="clock" show-time presentation="calendarClock" />
  <mp-date-range-picker v-model="calendarPicker" show-time presentation="calendarPicker" />
  <mp-date-range-picker v-model="picker" show-time presentation="picker" />
</template>
