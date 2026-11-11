<script setup>
import { ref } from 'vue'

const value = ref(['09:30:00', '17:00:00'])
const step = { hour: 1, minute: 15, second: 10 }
const use12Hours = ref(false)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>小时步长 1，分钟步长 15，秒步长 10。</p>
    <mp-checkbox v-model="use12Hours" edit-mode="direct">12 小时面板，模型仍为 HH:mm:ss</mp-checkbox>
    <mp-time-range
      v-model="value"
      edit-mode="direct"
      format="HH:mm:ss"
      :use12-hours="use12Hours"
      :step="step"
      style="width: 100%; max-width: 360px"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
