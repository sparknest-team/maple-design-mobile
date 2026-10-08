<script setup>
import { ref } from 'vue'

const date = new Date(2026, 8, 23, 13, 5, 9)
const later = new Date(2026, 8, 23, 18, 30, 0)
const value = ref([date, later.getTime()])
const literal = ref(['Time 09:30', 'Time 18:00'])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Date 和时间戳按本地时间反显；选择后返回格式化字符串。</p>
    <mp-time-range v-model="value" format="hh:mm A" style="width: 100%; max-width: 360px" />
    <span>当前模型: {{ value }}</span>
    <mp-time-range v-model="literal" format="[Time] HH:mm" style="width: 100%; max-width: 360px" />
    <span>固定文字格式: {{ literal }}</span>
  </mp-space>
</template>
