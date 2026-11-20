<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
const value = ref<(string | number)[]>(['A'])
const columns = [[{ text: 'A' }, { text: 'B' }, { text: 'C' }]]
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="disabled" edit-mode="direct">禁用选择器</mp-checkbox>
    <mp-picker v-model="value" :columns="columns" :disabled="disabled" :toolbar="false" />
    <output aria-label="选择器值">{{ value[0] }}</output>
  </mp-space>
</template>
