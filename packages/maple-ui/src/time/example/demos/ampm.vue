<script setup>
import { ref } from 'vue'

const value = ref('12:00:00 am')
const noon = ref('12:00:00 pm')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>12 AM 是午夜，12 PM 是中午。字段与面板联动展示。</p>
    <mp-time v-model="value" use12-hours style="width: 100%; max-width: 360px" />
    <mp-time v-model="noon" use12-hours style="width: 100%; max-width: 360px" />
    <mp-time-picker v-model="noon" use12-hours />
    <span>当前值: {{ value }}</span>
  </mp-space>
</template>
