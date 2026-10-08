<script setup>
import { ref } from 'vue'

const date = ref('10:30:40')

const disabledHours = () => Array.from({ length: 24 }, (_, hour) => hour).filter((hour) => hour % 2 !== 0)
const disabledMinutes = (hour) => (hour === 10 ? [0, 15, 45] : [])
const disabledSeconds = (hour, minute) => (hour === 10 && minute === 30 ? [41, 43, 45] : [])
</script>

<template>
  <p>Clock mode: 10:30:38–18:40:22 inclusive, combined with disabled rules.</p>
  <mp-time-picker
    v-model="date"
    format="HH:mm:ss"
    presentation="clock"
    min="10:30:38"
    max="18:40:22"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
  />
</template>
