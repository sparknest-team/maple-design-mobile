<script setup>
import { ref } from 'vue'

const calendarPicker = ref('2025-01-15 10:29')
const picker = ref('2025-01-15 10:29')
</script>

<template>
  <mp-date-picker
    v-model="calendarPicker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="calendarPicker"
  />
  <mp-date-picker
    v-model="picker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="picker"
  />
</template>
