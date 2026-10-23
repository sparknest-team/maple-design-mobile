<script setup>
import { ref } from 'vue'

const date = ref('17:36:22')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm:ss" />
</template>
