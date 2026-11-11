<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const calendarDate = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="calendarDate" panel-type="calendar" placeholder="使用日历选择日期" clearable />
  </mp-space>
</template>
