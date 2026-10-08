<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const customSeparator = ref(['09:00', '18:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="customSeparator" format="HH:mm" separator=" 至 " placeholder="自定义分隔符" clearable />
  </mp-space>
</template>
