<script setup>
import { ref } from 'vue'

const minute = ref()
const second = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <span>分钟列：时 / 分</span>
    <mp-date
      v-model="minute"
      show-time
      :time-fields="['hour', 'minute']"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      clearable
    />
    <span>已提交值：{{ minute || '未选择' }}</span>
    <span>秒精度：两端的默认精度</span>
    <mp-date v-model="second" show-time :time-fields="['hour', 'minute', 'second']" clearable />
    <span>已提交值：{{ second || '未选择' }}</span>
  </mp-space>
</template>
