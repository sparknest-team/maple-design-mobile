<script setup>
import { ref } from 'vue'

const outlineValue13 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue13" variant="outline" size="sm" placeholder="小尺寸">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-space>
</template>
