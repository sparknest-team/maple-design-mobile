<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
// Replace this loader body with your API and response mapping.
async function request(query: string, { signal }: { signal: AbortSignal }) {
  await new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer)
      reject(new Error('Cancelled'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort)
      resolve()
    }, 300)
    if (signal.aborted) {
      abort()
      return
    }
    signal.addEventListener('abort', abort, { once: true })
  })
  return [
    { value: 'a', label: 'Alice' },
    { value: 'b', label: 'Bob' },
  ].filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
}
const error = ref('')
</script>
<template>
  <mp-space direction="column">
    <mp-select v-model="value" :options="request" filterable @load-error="error = 'Load failed'" />
    <p role="alert">{{ error }}</p>
    <p>Selected: {{ value }}</p>
  </mp-space>
</template>
