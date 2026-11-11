<script setup>
import { ref } from 'vue'

const searchButtonValue = ref('')
const menuHistoryValue = ref('')
const menuRecentSearches = ref(['设备名称', '订单编号', '操作人'])
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
    placeholder="搜索"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleSearch"
  />

  <mp-search
    v-model="menuHistoryValue"
    placeholder="搜索"
    :recent-searches="menuRecentSearches"
    edit-mode="direct"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleMenuHistorySearch"
  />
</template>
