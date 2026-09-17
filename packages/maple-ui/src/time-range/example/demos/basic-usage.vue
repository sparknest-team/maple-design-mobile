<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="range" placeholder="请选择时间范围" clearable />
  </mp-space>
</template>
