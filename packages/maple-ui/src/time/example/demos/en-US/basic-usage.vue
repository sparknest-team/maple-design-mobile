<script setup>
import { reactive, ref } from 'vue'

const time = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="time" format="HH:mm" placeholder="Select a time" clearable />
  </mp-space>
</template>
