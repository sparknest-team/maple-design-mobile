<script setup>
import { ref } from 'vue'

const date = ref('07:10')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm" readonly />
</template>
