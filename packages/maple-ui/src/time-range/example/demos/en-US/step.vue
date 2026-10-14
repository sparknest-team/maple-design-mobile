<script setup>
import { ref } from 'vue'

const value = ref(['09:30:00', '17:00:00'])
const step = { hour: 1, minute: 15, second: 10 }
const use12Hours = ref(false)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Hourly candidates, 15-minute and 10-second intervals.</p>
    <label><input v-model="use12Hours" type="checkbox" /> 12-hour panel; model remains HH:mm:ss</label>
    <mp-time-range
      v-model="value"
      format="HH:mm:ss"
      :use12-hours="use12Hours"
      :step="step"
      style="width: 100%; max-width: 360px"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
