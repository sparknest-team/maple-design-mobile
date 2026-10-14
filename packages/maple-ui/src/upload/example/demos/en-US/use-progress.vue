<script setup>
import { onUnmounted, ref } from 'vue'

const files = ref([])
const timers = new Set()
function start(file) {
  file.status = 'uploading'
  const timer = setInterval(() => {
    file.percent = Math.min(file.percent + 10, 100)
    if (file.percent === 100) {
      file.status = 'success'
      clearInterval(timer)
      timers.delete(timer)
    }
  }, 200)
  timers.add(timer)
}
onUnmounted(() => timers.forEach((timer) => clearInterval(timer)))
</script>

<template>
  <div>
    <mp-upload v-model="files" @read="start"></mp-upload>
  </div>
</template>
