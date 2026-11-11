<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui-vue'

const field = ref('name')
const model = ref<Record<string, unknown>>({ name: '设备 A', tenant: 'demo' })
const accepted = ref(true)
const history = ref(['设备 A', '42'])
const result = ref<SearchResult>()
const fields = [
  { value: 'name', label: '设备名称', placeholder: '输入名称' },
  { value: 'id', label: '设备 ID', placeholder: '输入 ID' },
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
    <mp-checkbox v-model="accepted">接受输入与清空（关闭后父级拒绝更新）</mp-checkbox>
    <mp-search
      :model="model"
      :model-field="field"
      :fields="fields"
      :recent-searches="history"
      edit-mode="direct"
      search-button
      button-text="搜索"
      clearable
      @update:model="updateModel"
      @update:model-field="updateField"
      @search="search"
    />
    <mp-button variant="text" @click="model = { name: '外部替换', tenant: 'demo' }">外部替换模型</mp-button>
    <div>已接受模型：{{ model }}</div>
    <p v-if="!accepted" role="status">父级正在拒绝输入和清空；打开上方开关后恢复。</p>
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
