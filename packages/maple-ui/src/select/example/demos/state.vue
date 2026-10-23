<script setup>
import { ref } from 'vue'

const outlineValue3 = ref()
const outlineValue4 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue3" variant="outline" placeholder="只读" readonly>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue4" variant="outline" placeholder="禁用" disabled>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-space>
</template>
