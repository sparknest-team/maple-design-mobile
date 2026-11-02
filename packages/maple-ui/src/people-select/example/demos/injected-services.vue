<script setup lang="ts">
import { onMounted, ref } from 'vue'

const personId = ref<string | null>('alice')
const log = ref('')
const people = [
  {
    value: 'alice',
    label: 'Alice',
    mobile: '13800000000',
    avatar:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24"%3E%3Ccircle cx="12" cy="12" r="12" fill="%236579af"/%3E%3C/svg%3E',
  },
  { value: 'bob', label: 'Bob', mobile: '13900000000' },
]
const displayed = ref<Record<string, (typeof people)[number]>>({})
// 模拟详情请求：回显数据独立更新，不加入候选列表。
onMounted(() => {
  setTimeout(() => {
    displayed.value.alice = people[0]
  }, 600)
})
const fallbackOption = (id: string) => displayed.value[id] ?? { value: id, label: id }
async function options(query: string, { signal }: { signal: AbortSignal }) {
  await new Promise((resolve) => setTimeout(resolve, 200))
  if (signal.aborted) {
    return []
  }
  return people.filter((person) => person.label.toLowerCase().includes(query.toLowerCase()))
}
async function call(person: { value: string; mobile?: string }) {
  log.value = `Call: ${person.mobile || person.value}`
}
async function chat(person: { value: string }) {
  log.value = `Chat: ${person.value}`
}
</script>
<template>
  <mp-space direction="column">
    <mp-people-select
      v-model="personId"
      :options="options"
      :fallback-option="fallbackOption"
      clearable
      :empty-value="null"
    />
    <mp-people-select
      v-model="personId"
      :fallback-option="fallbackOption"
      show-phone
      show-chat
      :call="call"
      :chat="chat"
      read-pretty
    />
    <p role="status">{{ log }}</p>
  </mp-space>
</template>
