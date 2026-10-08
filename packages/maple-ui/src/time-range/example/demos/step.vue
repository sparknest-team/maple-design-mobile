<script setup>
import { ref } from 'vue'

const value = ref(['09:30:00', '17:00:00'])
const step = { hour: 1, minute: 15, second: 10 }
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>小时步长 1，分钟步长 15，秒步长 10。</p>
    <mp-time-range v-model="value" format="HH:mm:ss" :step="step" style="width: 100%; max-width: 360px" />
    <span>{{ value }}</span>
  </mp-space>
</template>
