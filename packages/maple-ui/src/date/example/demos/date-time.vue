<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const dateTime = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="dateTime" show-time placeholder="请选择日期时间" clearable />
  </mp-space>
</template>
