<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const nextDayRange = ref(['22:00', '06:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="nextDayRange" show-next-day format="24hr" placeholder="跨天时段" clearable />
  </mp-space>
</template>
