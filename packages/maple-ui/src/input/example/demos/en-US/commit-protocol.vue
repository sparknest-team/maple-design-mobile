<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | null>('Project A')
const message = ref('')
async function beforeCommit(
  { value: next, previousValue }: { value: unknown; previousValue: unknown },
  _done: (allow?: boolean) => void,
  { signal }: { signal: AbortSignal },
) {
  if (next === previousValue) {
    return true
  }
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (signal.aborted) {
    return false
  }
  message.value = `Saved: ${String(next)}`
  return true
}
</script>
<template>
  <mp-space direction="column">
    <mp-input v-model="value" edit-mode="popup" clearable :empty-value="null" :before-commit="beforeCommit" />
    <p role="status">{{ message }}</p>
  </mp-space>
</template>
