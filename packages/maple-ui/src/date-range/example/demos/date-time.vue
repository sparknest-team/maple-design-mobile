<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const dateTimeRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="dateTimeRange" show-time :use-seconds="false" placeholder="请选择日期时间范围" clearable />
  </mp-space>
</template>
