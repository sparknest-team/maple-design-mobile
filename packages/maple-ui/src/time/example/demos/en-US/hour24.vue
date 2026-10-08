<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const time24 = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="time24" format="HH:mm" placeholder="24-hour format" clearable />
  </mp-space>
</template>
