<script setup>
import { ref } from 'vue'

const calendarPicker = ref('2025-01-15 10:29')
const picker = ref('2025-01-15 10:29')
</script>

<template>
  <mp-date-picker v-model="calendarPicker" show-time :use-seconds="false" presentation="calendarPicker" />
  <mp-date-picker v-model="picker" show-time :use-seconds="false" presentation="picker" />
</template>
