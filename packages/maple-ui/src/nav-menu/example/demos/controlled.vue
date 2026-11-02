<script setup lang="ts">
import { ref } from 'vue'

const accepted = ref(true)
const open = ref(false)
const value = ref<string | number | null>(null)
const options = [
  { key: 0, label: '不限' },
  { key: 'design', label: '设计' },
  { key: 'disabled', label: '禁用选项', disabled: true },
]
function updateOpen(next: boolean) {
  if (accepted.value) {
    open.value = next
  }
}
function updateValue(next: string | number | null) {
  if (accepted.value) {
    value.value = next
  }
}
</script>
<template>
  <mp-button @click="accepted = !accepted">{{
    accepted ? '当前接受更新，点击拒绝' : '当前拒绝更新，点击接受'
  }}</mp-button>
  <mp-nav-menu>
    <mp-nav-menu-item
      :open="open"
      :model-value="value"
      :options="options"
      label="受控筛选"
      @update:open="updateOpen"
      @update:model-value="updateValue"
    />
    <mp-nav-menu-item label="禁用入口" disabled :options="options" />
  </mp-nav-menu>
  <p>选中：{{ value ?? '未选择' }}；展开：{{ open }}</p>
</template>
