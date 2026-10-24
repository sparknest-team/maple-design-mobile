<script setup lang="ts">
import { computed, ref } from 'vue'

const active = ref('edit')
const selectedLabel = ref('编辑')
const selectionOptions = computed(() => [
  { label: '编辑', value: 'edit' },
  { label: '复制', value: 'copy' },
  { label: '删除', value: 'delete' },
])
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  selectedLabel.value = String(option.label ?? '')
}
</script>

<template>
  <mp-space direction="column">
    <mp-menu v-model="active" :options="selectionOptions" @select="handleSelect">
      <mp-button>{{ selectedLabel || '请选择操作' }}</mp-button>
    </mp-menu>
    <span>当前值：{{ active || '-' }}，最近选择：{{ selectedLabel || '-' }}</span>
  </mp-space>
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
