<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const rangeClock = ref(['09:00', '18:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="rangeClock" presentation="clock" format="24hr" placeholder="时钟时间范围" clearable />
  </mp-space>
</template>
