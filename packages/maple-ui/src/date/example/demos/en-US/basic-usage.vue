<script setup>
import { reactive, ref } from 'vue'

const date = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="date" placeholder="Select a date" clearable />
  </mp-space>
</template>
