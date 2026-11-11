<script setup>
import { ref } from 'vue'

const range = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-date-range-picker v-model="range" readonly />
</template>
