<script setup>
import { ref } from 'vue'

const historyValue = ref('')
const recentSearches = ref(['Maple', 'Cedar', 'InputNumber'])
function handleSearch(result) {
  console.log('search', result)
}
function handleHistorySearch(result) {
  recentSearches.value = result.recentSearches
  handleSearch(result)
}
</script>

<template>
  <mp-search
    v-model="historyValue"
    placeholder="搜索"
    :recent-searches="recentSearches"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleHistorySearch"
  />
</template>
