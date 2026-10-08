<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'

const range = ref([])
const range24 = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="range24" format="HH:mm:ss" placeholder="含秒的时间范围" clearable />
  </mp-space>
</template>
