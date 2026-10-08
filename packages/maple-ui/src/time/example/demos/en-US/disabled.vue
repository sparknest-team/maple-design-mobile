<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const disabledTime = ref('09:30')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="disabledTime" format="HH:mm" disabled />
  </mp-space>
</template>
