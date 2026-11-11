<script setup>
import { ref } from 'vue'

const countToRef = ref()
</script>

<template>
  <mp-count-to ref="countToRef" :to="123456" :auto-start="false" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button status="primary" @click="countToRef.start()">开始</mp-button>
    <mp-button @click="countToRef.pause()">暂停</mp-button>
    <mp-button @click="countToRef.reset()">重置</mp-button>
  </mp-row>
</template>
