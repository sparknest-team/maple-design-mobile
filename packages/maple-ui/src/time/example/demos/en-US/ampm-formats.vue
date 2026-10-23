<script setup>
import { ref } from 'vue'

const morning = ref('09:30 AM')
const afternoon = ref('05:45 PM')
const noon = ref('12:00:00 PM')
</script>
<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Minute precision with AM / PM: choose morning and afternoon times.</p>
    <mp-time v-model="morning" format="hh:mm A" use12-hours />
    <mp-time v-model="afternoon" format="hh:mm A" use12-hours />
    <p>Standalone seconds: 12 AM is midnight and 12 PM is noon.</p>
    <mp-time-picker v-model="noon" format="hh:mm:ss A" use12-hours />
    <output>{{ morning }} / {{ afternoon }} / {{ noon }}</output>
  </mp-space>
</template>
