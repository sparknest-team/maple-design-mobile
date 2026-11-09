<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const trimmed = ref('')
</script>
<template>
  <mp-space direction="column">
    <mp-textarea v-model="value" clearable placeholder="请输入多行文本" aria-label="受控文本" />
    <p role="status">当前值：{{ value || '（空）' }}</p>
    <mp-textarea default-value="这是一段非受控初始文本" aria-label="非受控文本" />
    <mp-textarea v-model.trim="trimmed" placeholder="输入首尾空白，观察模型值" aria-label="去除首尾空白" />
    <p role="status">去除空白后的值：{{ JSON.stringify(trimmed) }}</p>
  </mp-space>
</template>
