<script setup>
import { ref } from 'vue'

const value = ref()
</script>
<template>
  <mp-form-item layout="vertical" hide-label>
    <mp-select v-model="value" variant="standard" placeholder="请选择一个选项" aria-label="基础单选示例">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-form-item>
</template>
