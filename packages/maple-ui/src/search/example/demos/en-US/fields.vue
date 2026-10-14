<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maplejs/maple-ui'

const field = ref('name')
const model = ref<Record<string, unknown>>({ name: 'Device A', tenant: 'demo' })
const accepted = ref(true)
const history = ref(['Device A', '42'])
const result = ref<SearchResult>()
const fields = [
  { value: 'name', label: 'Device name', placeholder: 'Enter name' },
  { value: 'id', label: 'Device ID', placeholder: 'Enter ID' },
]
function updateModel(proposal: Record<string, unknown>) {
  if (accepted.value) {
    model.value = proposal
  }
}
function updateField(proposal: string) {
  if (accepted.value) {
    field.value = proposal
  }
}
function search(next: SearchResult) {
  result.value = next
  history.value = next.recentSearches
}
</script>
<template>
  <div class="search-demo">
    <label
      ><input v-model="accepted" type="checkbox" />Accept updates (uncheck to demonstrate controlled rejection)</label
    >
    <mp-search
      :model="model"
      :model-field="field"
      :fields="fields"
      :recent-searches="history"
      :history-popup="false"
      search-button
      button-text="Search"
      clearable
      @update:model="updateModel"
      @update:model-field="updateField"
      @search="search"
    />
    <mp-button variant="text" @click="model = { name: 'External value', tenant: 'demo' }"
      >Replace model externally</mp-button
    >
    <div>Accepted model：{{ model }}</div>
    <pre v-if="result">{{ JSON.stringify(result, null, 2) }}</pre>
  </div>
</template>
<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
}
.search-demo pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
