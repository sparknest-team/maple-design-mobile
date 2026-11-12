<script setup lang="ts">
import { ref } from 'vue'
import type { PeopleSelectOption, PeopleSelectOptionsLoader } from '@maple-design/ui-vue'

const personId = ref<string | null>('alice')
const personIds = ref<string[]>(['alice', 'bob'])
const people: readonly PeopleSelectOption[] = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'carol', label: 'Carol' },
  { value: 'david', label: 'David', disabled: true },
]
const loadPeople: PeopleSelectOptionsLoader = async (query, { signal }) => {
  await new Promise<void>((resolve) => setTimeout(resolve, 200))
  if (signal.aborted) {
    return []
  }
  return people.filter((person) => person.label.toLowerCase().includes(query.toLowerCase()))
}
</script>

<template>
  <mp-space direction="column">
    <p>单选人员</p>
    <mp-people-select v-model="personId" :options="people" clearable :empty-value="null" />
    <p>多选人员（异步搜索）</p>
    <mp-people-select v-model="personIds" :options="loadPeople" multiple clearable />
    <p role="status">IDs: {{ personIds.join(', ') || '—' }}</p>
    <mp-people-select v-model="personIds" :options="people" multiple read-pretty />
  </mp-space>
</template>
