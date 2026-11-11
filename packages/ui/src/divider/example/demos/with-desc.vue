<script setup>
import { ref } from 'vue'

const rtl = ref(false)
</script>

<template>
  <div>
    <mp-checkbox v-model="rtl">RTL</mp-checkbox>
    <div :dir="rtl ? 'rtl' : 'ltr'">
      <mp-divider text-align="start" description="起点 / Start" />
      <mp-divider description="居中 / Center" />
      <mp-divider text-align="end" description="终点 / End" />
    </div>
  </div>
</template>
