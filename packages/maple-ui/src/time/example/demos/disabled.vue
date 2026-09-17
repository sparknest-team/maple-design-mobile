<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const disabledTime = ref('09:30')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="disabledTime" format="24hr" disabled />
  </mp-space>
</template>
