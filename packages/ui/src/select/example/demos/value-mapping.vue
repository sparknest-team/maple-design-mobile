<script setup>
import { ref } from 'vue'

const outlineValue2 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue2" variant="outline" placeholder="文本关联值">
      <mp-option label="吃饭" :value="1" />
      <mp-option label="睡觉" :value="2" />
    </mp-select>
    <div class="relation">当前选择的是: {{ outlineValue2 }}</div>
  </mp-space>
</template>
