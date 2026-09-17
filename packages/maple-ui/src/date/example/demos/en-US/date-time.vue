<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const dateTime = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="dateTime" show-time placeholder="Select date and time" clearable />
  </mp-space>
</template>
