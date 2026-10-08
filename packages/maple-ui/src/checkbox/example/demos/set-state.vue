<script setup>
import { ref } from 'vue'

const selected = ref([])
</script>
<template>
  <mp-checkbox v-model="selected" :value="1">选项 1，当前选中值：{{ selected }}</mp-checkbox>
</template>
