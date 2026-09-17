<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref([
  { key: '1', title: '标签 1', content: '标签 1 内容' },
  { key: '2', title: '标签 2', content: '标签 2 内容' },
  { key: '3', title: '固定标签', content: '该标签不可关闭' },
])
let count = 4

function add() {
  const key = String(count++)
  tabs.value.push({ key, title: `标签 ${key}`, content: `标签 ${key} 内容` })
}

function remove(key: string | number) {
  tabs.value = tabs.value.filter((tab) => tab.key !== key)
}
</script>

<template>
  <mp-tabs variant="card" editable show-add-button auto-switch @add="add" @delete="remove">
    <mp-tabs-navs aria-label="可编辑标签">
      <mp-tab-nav v-for="tab in tabs" :key="tab.key" :title="tab.title" :closable="tab.key !== '3'" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item v-for="tab in tabs" :key="tab.key">{{ tab.content }}</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
