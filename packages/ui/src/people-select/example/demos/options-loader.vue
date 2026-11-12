<script setup lang="ts">
import { ref } from 'vue'
import type { PeopleSelectOption, PeopleSelectOptionsLoader } from '@maple-design/ui-vue'

const personId = ref<string | null>(null)
const errorText = ref('')
const people: readonly PeopleSelectOption[] = [
  { value: 'alice', label: 'Alice', mobile: '13800000000' },
  { value: 'bob', label: 'Bob', mobile: '13900000000' },
  { value: 'carol', label: 'Carol', disabled: true },
]

// 模拟请求；实际业务应将 signal 传给 fetch 等请求库。
const loadPeople: PeopleSelectOptionsLoader = async (query, { signal }) => {
  errorText.value = ''
  await new Promise<void>((resolve) => setTimeout(resolve, 400))
  if (signal.aborted) {
    return []
  }
  return people.filter((person) => person.label.toLowerCase().includes(query.toLowerCase()))
}

function onLoadError(error: unknown) {
  errorText.value = error instanceof Error ? error.message : String(error)
}
</script>

<template>
  <mp-space direction="column">
    <mp-people-select
      v-model="personId"
      :options="loadPeople"
      :search-delay="300"
      placeholder="Alice / Bob"
      clearable
      :empty-value="null"
      @load-error="onLoadError"
    />
    <p role="status">ID: {{ personId ?? '—' }}</p>
    <p v-if="errorText" role="alert">{{ errorText }}</p>
  </mp-space>
</template>
