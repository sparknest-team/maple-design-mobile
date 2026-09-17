<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const value = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="20" />
    <mp-progress :percent="value" :track="false" show-text />
    <mp-progress :percent="100" show-text>success</mp-progress>
  </mp-space>
</template>
