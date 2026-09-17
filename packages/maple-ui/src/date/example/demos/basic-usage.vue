<script setup>
import { reactive, ref } from 'vue'

const date = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="date" placeholder="请选择日期" clearable />
  </mp-space>
</template>
