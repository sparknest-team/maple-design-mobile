<script setup>
import { ref } from 'vue'

const value = ref('')
function handleSearch(result) {
  console.log('search', result)
}
</script>

<template>
  <mp-search v-model="value" label="地址" placeholder="搜索" @search="handleSearch" />
</template>
