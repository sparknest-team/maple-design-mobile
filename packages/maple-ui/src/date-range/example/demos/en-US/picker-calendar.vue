<script setup>
import { ref } from 'vue'

const range = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-date-range-picker v-model="range" presentation="calendar" />
</template>
