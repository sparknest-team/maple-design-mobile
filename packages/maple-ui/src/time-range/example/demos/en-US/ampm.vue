<script setup>
import { ref } from 'vue'

const value = ref(['11:30:00 pm', '12:30:00 am'])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Switch AM/PM at either endpoint. 12 AM is midnight; 12 PM is noon.</p>
    <mp-time-range v-model="value" use12-hours show-next-day style="width: 100%; max-width: 360px" />

    <span>Model: {{ value }}</span>
  </mp-space>
</template>
