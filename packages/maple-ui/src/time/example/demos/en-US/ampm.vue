<script setup>
import { ref } from 'vue'

const value = ref('12:00:00 am')
const noon = ref('12:00:00 pm')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>12 AM is midnight; 12 PM is noon. Fields and the panel stay in sync.</p>
    <mp-time v-model="value" use12-hours style="width: 100%; max-width: 360px" />
    <mp-time v-model="noon" use12-hours style="width: 100%; max-width: 360px" />
    <mp-time-picker v-model="noon" use12-hours />
    <span>Model: {{ value }}</span>
  </mp-space>
</template>
