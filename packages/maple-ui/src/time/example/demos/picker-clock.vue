<script setup>
import { ref } from 'vue'

const date = ref('11:20')
</script>

<template>
  <mp-time-picker v-model="date" presentation="clock" />
</template>
