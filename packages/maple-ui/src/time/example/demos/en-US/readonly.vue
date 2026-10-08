<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const readonlyTime = ref('09:30')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="readonlyTime" format="HH:mm" readonly />
  </mp-space>
</template>
