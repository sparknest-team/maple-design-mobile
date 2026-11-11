<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])
const caseSensitive = ref(false)
const options = [{ value: 'fruit', label: 'Fruit', children: [{ value: 'apple', label: 'Apple' }] }]
</script>
<template>
  <mp-space direction="column" fill>
    <mp-space><mp-switch v-model="caseSensitive" /><span>区分大小写</span></mp-space>
    <mp-cascader
      v-model="value"
      :options="options"
      :case-sensitive="caseSensitive"
      filterable
      placeholder="输入 fruit、Fruit、apple 或 Apple"
    />
    <p>保留原有路径标签匹配。启用区分大小写后，输入 fruit 不匹配 Fruit。</p>
  </mp-space>
</template>
