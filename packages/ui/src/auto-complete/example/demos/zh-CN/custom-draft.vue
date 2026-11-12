<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ['Design', 'Engineering', 'Operations']
</script>

<template>
  <div>
    <p>选择候选项会立即提交；输入自定义内容后点击确认。</p>
    <mp-auto-complete v-model="value" edit-mode="popup" :options="options" />
    <p>已提交: {{ value || '—' }}</p>
  </div>
</template>
