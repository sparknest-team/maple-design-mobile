<script setup>
import { ref } from 'vue'

const value = ref('')
const submitted = ref('')
function handleSearch(result) {
  submitted.value = result.modelValue
}
</script>

<template>
  <mp-search v-model="value" label="地址" placeholder="搜索" @search="handleSearch" />
  <p role="status">搜索结果：{{ submitted || '尚未搜索' }}</p>
</template>
