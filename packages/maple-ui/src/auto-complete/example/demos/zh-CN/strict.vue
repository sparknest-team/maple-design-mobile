<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      v-model="looseValue"
      :options="options"
      placeholder="默认：输入 ar"
      style="width: 100%; max-width: 320px"
    />
    <mp-auto-complete
      v-model="strictValue"
      :options="options"
      strict
      placeholder="严格：输入 Ar"
      style="width: 100%; max-width: 320px"
    />
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['Arco', 'Maple', 'Cedar']
const looseValue = ref('')
const strictValue = ref('')
</script>
