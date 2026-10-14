<script setup lang="ts">
import { ref } from 'vue'

const use12Hours = ref(true)
const timeOptions = { step: { minute: 15 }, hideDisabledOptions: true }
</script>

<template>
  <mp-checkbox v-model="use12Hours">12-hour display</mp-checkbox>
  <p>Click the time tab below the date to view the clock. The wheel below demonstrates column sizing.</p>
  <mp-date-picker
    model-value="2025-01-05 13:30"
    show-time
    :use-seconds="false"
    presentation="calendarClock"
    :time-picker-props="{ ...timeOptions, use12Hours }"
  />
  <mp-date-picker presentation="picker" :picker-props="{ optionHeight: 36, optionCount: 4 }" />
</template>
