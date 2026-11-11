<script setup>
import { ref } from 'vue'

const date = new Date(2026, 8, 23, 13, 5, 9)
const timestamp = ref(date.getTime())
const value = ref(date)
const literal = ref('Time 09:30')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Date and timestamp inputs use local time. After selection, the model is a formatted string.</p>
    <mp-time v-model="value" format="hh:mm A" style="width: 100%; max-width: 360px" />
    <span>Current model: {{ value }}</span>
    <mp-time v-model="timestamp" format="HH:mm:ss" style="width: 100%; max-width: 360px" />
    <span>Timestamp model: {{ timestamp }}</span>
    <mp-time v-model="literal" format="[Time] HH:mm" style="width: 100%; max-width: 360px" />
    <span>Literal format: {{ literal }}</span>
  </mp-space>
</template>
