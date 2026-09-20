<script setup>
import { ref } from 'vue'

const success = ref(false)
</script>

<template>
  <mp-result title="成功" subtitle="嗨~ 我是结果页的一段描述~">
    <template #extra>
      <mp-button status="success" @click="success = false">知道了</mp-button>
    </template>
  </mp-result>
</template>

<style scoped>
.result {
  width: 75vmin;
}
</style>
