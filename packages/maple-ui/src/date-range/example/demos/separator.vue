<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const customSeparator = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="customSeparator" separator=" 至 " placeholder="自定义分隔符" clearable />
  </mp-space>
</template>
