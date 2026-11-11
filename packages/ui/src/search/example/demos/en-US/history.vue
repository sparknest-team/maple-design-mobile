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
    placeholder="Search"
    :recent-searches="recentSearches"
    show-action
    action-type="search"
    action-text="Search"
    @search="handleHistorySearch"
  />
</template>
