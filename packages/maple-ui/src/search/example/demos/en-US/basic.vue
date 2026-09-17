<script setup>
import { ref } from 'vue'

const value = ref('')
function handleSearch(result) {
  console.log('search', result)
}
</script>

<template>
  <mp-search v-model="value" label="Address" placeholder="Search" @search="handleSearch" />
</template>
