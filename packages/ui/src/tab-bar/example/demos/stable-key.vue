<script setup>
import { ref } from 'vue'

const active = ref('home')
const tabs = ref([
  { name: 'home', label: '首页' },
  { name: 'favorites', label: '收藏' },
  { name: 'profile', label: '我的' },
])
</script>

<template>
  <p>使用稳定的 key 和 name。选择标签后反转顺序，仍保持选中同一项。</p>
  <mp-button @click="tabs.reverse()">反转顺序</mp-button>
  <mp-tab-bar v-model="active">
    <mp-tab-bar-item v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label" />
  </mp-tab-bar>
  <p aria-live="polite">当前选中：{{ tabs.find((tab) => tab.name === active)?.label }}</p>
</template>
