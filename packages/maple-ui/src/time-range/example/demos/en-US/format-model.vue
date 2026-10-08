<script setup>
import { ref } from 'vue'

const date = new Date(2026, 8, 23, 13, 5, 9)
const later = new Date(2026, 8, 23, 18, 30, 0)
const value = ref([date, later.getTime()])
const literal = ref(['Time 09:30', 'Time 18:00'])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Date and timestamp inputs use local time. After selection, the model is a formatted string.</p>
    <mp-time-range v-model="value" format="hh:mm A" style="width: 100%; max-width: 360px" />
    <span>Current model: {{ value }}</span>
    <mp-time-range v-model="literal" format="[Time] HH:mm" style="width: 100%; max-width: 360px" />
    <span>Literal format: {{ literal }}</span>
  </mp-space>
</template>
