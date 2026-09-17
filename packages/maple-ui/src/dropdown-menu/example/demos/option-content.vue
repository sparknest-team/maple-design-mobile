<script setup lang="ts">
import { computed, h } from 'vue'

const inlineIcon = (text: string) => h('span', { 'aria-hidden': 'true' }, text)
const contentOptions = computed(() => [
  { label: '编辑', value: 'edit', icon: inlineIcon('✎'), extra: '⌘ E' },
  {
    label: ({ active }: { active: boolean }) => h('strong', active ? '已复制' : '复制'),
    value: 'copy',
    icon: inlineIcon('⧉'),
    extra: '⌘ C',
  },
  { label: '删除', value: 'delete', icon: inlineIcon('⌫'), extra: '⌫', disabled: true },
])
</script>

<template>
  <mp-dropdown-menu :options="contentOptions">
    <mp-button>自定义选项内容</mp-button>
  </mp-dropdown-menu>
</template>

<style>
.dropdown-menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.dropdown-menu-example-footer {
  padding: 8px 12px;
}
</style>
