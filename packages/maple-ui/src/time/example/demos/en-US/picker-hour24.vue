<script setup>
import { ref } from 'vue'

const date = ref('15:20')
</script>

<template>
  <mp-time-picker v-model="date" presentation="clock" format="24hr" />
</template>
