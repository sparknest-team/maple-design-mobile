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
  <mp-space wrap :size="['8vmin', '8vmin']">
    <mp-progress
      mode="circle"
      size="18vmin"
      :percent="100"
      :color="{
        '0%': '#3fecff',
        '100%': '#6149f6',
      }"
    />
    <mp-progress mode="circle" :percent="75" size="18vmin" :track="false" />
    <mp-progress mode="circle" show-text :percent="value" stroke-width="5" size="18vmin" />
    <mp-progress mode="circle" status="success" show-text :percent="100" stroke-width="5" size="18vmin">
      success
    </mp-progress>
  </mp-space>
</template>
