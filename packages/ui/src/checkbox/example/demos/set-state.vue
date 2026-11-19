<script setup>
import { ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const selected = ref([])
</script>
<template>
  <mp-checkbox v-model="selected" :value="1"
    >{{ english ? 'Option 1, selected values: ' : '选项 1，当前选中值：' }}{{ selected }}</mp-checkbox
  >
</template>
