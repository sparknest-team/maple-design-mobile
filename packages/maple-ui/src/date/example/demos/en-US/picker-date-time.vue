<script setup>
import { ref } from 'vue'

const clock = ref('2025-01-15 10:29')
const calendarPicker = ref('2025-01-15 10:29')
const picker = ref('2025-01-15 10:29')
</script>

<template>
  <mp-date-picker v-model="clock" show-time presentation="calendarClock" />
  <mp-date-picker v-model="calendarPicker" show-time presentation="calendarPicker" />
  <mp-date-picker v-model="picker" show-time presentation="picker" />
</template>
