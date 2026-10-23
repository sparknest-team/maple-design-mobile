<script setup lang="ts">
import { computed } from 'vue'

const groupOptions = computed(() => [
  {
    type: 'group',
    label: '文件操作',
    children: [
      { label: '新建', value: 'new' },
      { label: '打开', value: 'open' },
    ],
  },
  {
    type: 'group',
    label: '编辑操作',
    children: [
      { label: '复制', value: 'copy' },
      { label: '粘贴', value: 'paste' },
    ],
  },
])
</script>

<template>
  <mp-menu :options="groupOptions">
    <mp-button>选项分组</mp-button>
  </mp-menu>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
