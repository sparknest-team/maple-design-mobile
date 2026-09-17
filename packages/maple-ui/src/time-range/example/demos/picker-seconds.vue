<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'

const range = ref([])
const rangePickerSeconds = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="rangePickerSeconds" format="24hr" use-seconds placeholder="列滚轮含秒" clearable />
  </mp-space>
</template>
