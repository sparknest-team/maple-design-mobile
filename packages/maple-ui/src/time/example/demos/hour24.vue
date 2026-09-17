<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const time24 = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="time24" format="24hr" placeholder="24 小时制" clearable />
  </mp-space>
</template>
