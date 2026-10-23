<script setup>
import { ref } from 'vue'

const value = ref(['11:30 pm', '12:30 am'])
const workday = ref(['09:00 AM', '06:00 PM'])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Switch AM/PM at either endpoint. 12 AM is midnight; 12 PM is noon.</p>
    <mp-time-range v-model="value" format="hh:mm a" use12-hours show-next-day style="width: 100%; max-width: 360px" />

    <mp-time-range v-model="workday" format="hh:mm A" use12-hours />
    <mp-time-range-picker v-model="value" format="hh:mm a" use12-hours show-next-day />
    <span>Model: {{ value }}</span>
  </mp-space>
</template>
