<script setup>
import { ref } from 'vue'

const outlineValue9 = ref([])
const outlineValue10 = ref([])
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue9" variant="outline" placeholder="多选" multiple>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <mp-option label="打游戏" />
      <mp-option label="写代码" />
    </mp-select>
    <mp-select v-model="outlineValue10" variant="outline" placeholder="标签风格的多选" show-tags multiple>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <mp-option label="打游戏" />
      <mp-option label="写代码" />
    </mp-select>
  </mp-space>
</template>
