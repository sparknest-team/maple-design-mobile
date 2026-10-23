<script setup>
import { ref } from 'vue'

const outlineValue = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue" variant="outline" placeholder="请选择一个选项">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-space>
</template>
