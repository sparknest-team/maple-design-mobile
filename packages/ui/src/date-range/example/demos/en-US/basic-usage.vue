<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="range" placeholder="Select a date range" clearable />
  </mp-space>
</template>
