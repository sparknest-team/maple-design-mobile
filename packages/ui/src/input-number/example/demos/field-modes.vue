<script setup lang="ts">
import { ref } from 'vue'

const embed = ref(1)
const button = ref(1)
const input = ref(1)
</script>
<template>
  <div class="number-demo">
    <label>内嵌步进<mp-input-number v-model="embed" mode="embed" /></label>
    <label>左右按钮（便于触控）<mp-input-number v-model="button" mode="button" /></label>
    <label>纯输入<mp-input-number v-model="input" mode="input" /></label>
    <p>按钮可长按；输入框内使用 ↑ / ↓ 步进，Enter 或失焦提交。</p>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
