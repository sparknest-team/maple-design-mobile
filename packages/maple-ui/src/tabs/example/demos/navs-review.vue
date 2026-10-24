<script setup lang="ts">
import { ref } from 'vue'

const editable = ref(true)
const addable = ref(true)
const autoSwitch = ref(true)
const active = ref('one')
const items = ref([
  { key: 'one', title: '标签 1' },
  { key: 'two', title: '标签 2' },
])
let next = 3
function add() {
  const key = String(next++)
  items.value.push({ key, title: '标签 ' + key })
}
function remove(key: string | number) {
  const index = items.value.findIndex((item) => item.key === key)
  items.value = items.value.filter((item) => item.key !== key)
  if (active.value === key) {
    active.value = items.value[Math.min(index, items.value.length - 1)]?.key ?? ''
  }
}
</script>
<template>
  <mp-space wrap>
    <mp-checkbox v-model="editable">允许关闭</mp-checkbox>
    <mp-checkbox v-model="addable">显示新增</mp-checkbox>
    <mp-checkbox v-model="autoSwitch">新增自动切换</mp-checkbox>
  </mp-space>
  <mp-tabs
    v-model="active"
    :editable="editable"
    :show-add-button="addable"
    :auto-switch="autoSwitch"
    @add="add"
    @delete="remove"
  >
    <mp-tabs-navs aria-label="交付审查标签">
      <template #prefix><mp-tag>动态标签</mp-tag></template>
      <mp-tab-nav v-for="item in items" :key="item.key" :name="item.key" :title="item.title" />
      <template #suffix
        ><mp-tag>共 {{ items.length }} 项</mp-tag></template
      >
      <template #add-icon><mp-tag>＋</mp-tag></template>
    </mp-tabs-navs>
    <mp-tabs-items
      ><mp-tab-item v-for="item in items" :key="item.key" :name="item.key"
        >{{ item.title }} 内容</mp-tab-item
      ></mp-tabs-items
    >
  </mp-tabs>
  <p role="status">当前标签：{{ active }}；数量：{{ items.length }}</p>
</template>
