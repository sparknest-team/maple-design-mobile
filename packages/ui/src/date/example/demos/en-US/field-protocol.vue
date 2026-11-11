<script setup>
import { ref } from 'vue'

const disabled = ref(false)
const date = ref('2026-09-22')
const dateRange = ref(['2026-09-22', '2026-09-24'])
const time = ref('09:00')
const timeRange = ref(['23:00', '01:00'])
</script>

<template>
  <mp-space direction="column">
    <p>
      Range fields: tap the right input to edit the end. Switching sides only changes the draft; Confirm commits it.
    </p>
    <span>Disable fields</span>
    <mp-switch v-model="disabled" aria-label="Disable fields" />
    <mp-date v-model="date" :disabled="disabled" clearable placeholder="Date" />
    <mp-date-range v-model="dateRange" :disabled="disabled" clearable placeholder="Date range" />
    <mp-time v-model="time" format="HH:mm" :disabled="disabled" clearable placeholder="Time" />
    <mp-time-range
      v-model="timeRange"
      format="HH:mm"
      :disabled="disabled"
      clearable
      show-next-day
      placeholder="Time range"
    />
    <p>Date：{{ date || 'Empty' }}；Date range：{{ dateRange }}</p>
    <p>Time：{{ time || 'Empty' }}；Time range：{{ timeRange }}</p>
  </mp-space>
</template>
