<script setup>
import { ref } from 'vue'

const calendarPicker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
const seconds = ref(['2025-01-15 10:29:30', '2025-01-16 11:29:45'])
const picker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
</script>

<template>
  <mp-date-range-picker
    v-model="calendarPicker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="calendarPicker"
  />
  <mp-date-range-picker
    v-model="seconds"
    show-time
    :time-fields="['hour', 'minute', 'second']"
    presentation="calendarPicker"
  />
  <mp-date-range-picker
    v-model="picker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="picker"
  />
</template>
