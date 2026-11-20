<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const rangePickerSeconds = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="rangePickerSeconds" format="HH:mm:ss" placeholder="列滚轮含秒" clearable />
  </mp-space>
</template>
