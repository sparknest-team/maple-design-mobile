<script setup>
import { ref } from 'vue'

const tabs = [
  { name: 'home', label: '首页' },
  { name: 'favorites', label: '收藏' },
  { name: 'profile', label: '我的' },
]

const active = ref('home')
</script>
<template>
  <p>选中标签加粗，点击标签查看变化。</p>
  <mp-tab-bar v-model="active">
    <mp-tab-bar-item v-for="tab in tabs" :key="tab.name" :name="tab.name">
      <template #default="{ active: selected }">
        <span :style="{ fontWeight: selected ? 700 : 400 }">{{ tab.label }}</span>
      </template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
