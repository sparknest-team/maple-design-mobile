<script setup>
import { ref } from 'vue'

const calendarPicker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
const seconds = ref(['2025-01-15 10:29:30', '2025-01-16 11:29:45'])
const picker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
</script>

<template>
  <mp-date-range-picker v-model="calendarPicker" show-time :use-seconds="false" presentation="calendarPicker" />
  <mp-date-range-picker v-model="seconds" show-time use-seconds presentation="calendarPicker" />
  <mp-date-range-picker v-model="picker" show-time :use-seconds="false" presentation="picker" />
</template>
