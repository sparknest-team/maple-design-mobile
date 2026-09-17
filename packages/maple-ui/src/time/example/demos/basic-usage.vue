<script setup>
import { reactive, ref } from 'vue'

const time = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="time" placeholder="请选择时间" clearable />
  </mp-space>
</template>
