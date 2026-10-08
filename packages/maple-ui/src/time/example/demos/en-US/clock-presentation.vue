<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const clockTime = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time
      v-model="clockTime"
      format="HH:mm"
      presentation="clock"
      placeholder="Select a time from the clock"
      clearable
    />
  </mp-space>
</template>
