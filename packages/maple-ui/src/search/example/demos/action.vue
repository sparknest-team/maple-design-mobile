<script setup>
import { ref } from 'vue'

const actionValue = ref('')
</script>

<template>
  <mp-search v-model="actionValue" placeholder="搜索" show-action action-text="取消" />
</template>
