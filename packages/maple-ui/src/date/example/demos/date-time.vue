<script setup>
import { ref } from 'vue'

const minute = ref()
const second = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <span>分钟精度：关闭 use-seconds</span>
    <mp-date v-model="minute" show-time :use-seconds="false" clearable />
    <span>已提交值：{{ minute || '未选择' }}</span>
    <span>秒精度：两端的默认精度</span>
    <mp-date v-model="second" show-time use-seconds clearable />
    <span>已提交值：{{ second || '未选择' }}</span>
  </mp-space>
</template>
