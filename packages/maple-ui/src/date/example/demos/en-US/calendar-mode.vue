<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const calendarDate = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="calendarDate" presentation="calendar" placeholder="Select a date from the calendar" clearable />
  </mp-space>
</template>
