<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maplejs/maple-ui'

const keyword = ref('')
const popup = ref(false)
const history = ref(['Project A', 'Device B'])
const lastAction = ref('No search yet')
function recordSearch(result: SearchResult) {
  history.value = result.recentSearches
  lastAction.value = result.modelValue
}
function recordAction(result: SearchResult) {
  lastAction.value = result.modelValue
}
</script>
<template>
  <div class="search-demo">
    <label><input v-model="popup" type="checkbox" />Fullscreen history (uncheck for a menu)</label>
    <mp-search
      v-model="keyword"
      :history-popup="popup"
      :recent-searches="history"
      label="Resource"
      placeholder="Enter resource name"
      clearable
      show-action
      action-text="Cancel"
      @cancel="lastAction = 'Cancelled'"
      @search="recordSearch"
    />
    <mp-search
      v-model="keyword"
      search-button
      :button-props="{ variant: 'outline' }"
      placeholder="Custom button slots"
      @search="recordAction"
    >
      <template #button-icon><span aria-hidden="true">⌕</span></template>
      <template #button-default>Find</template>
    </mp-search>
    <div>Last action：{{ lastAction }}</div>
  </div>
</template>
<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
}
</style>
