<script setup>
import { ref } from 'vue'

const searchButtonValue = ref('')
const menuHistoryValue = ref('')
const menuRecentSearches = ref(['Device name', 'Order number', 'Operator'])
function handleSearch(result) {
  console.log('search', result)
}
function handleMenuHistorySearch(result) {
  menuRecentSearches.value = result.recentSearches
  handleSearch(result)
}
</script>

<template>
  <mp-search
    v-model="searchButtonValue"
    placeholder="Search"
    show-action
    action-type="search"
    action-text="Search"
    @search="handleSearch"
  />

  <mp-search
    v-model="menuHistoryValue"
    placeholder="Search"
    :recent-searches="menuRecentSearches"
    edit-mode="direct"
    show-action
    action-type="search"
    action-text="Search"
    @search="handleMenuHistorySearch"
  />
</template>
