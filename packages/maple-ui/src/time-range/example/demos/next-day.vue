<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const nextDayRange = ref(['22:00', '06:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="nextDayRange" format="HH:mm" show-next-day placeholder="跨天时段" clearable />
  </mp-space>
</template>
