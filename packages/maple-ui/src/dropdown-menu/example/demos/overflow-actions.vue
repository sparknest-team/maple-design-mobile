<script setup lang="ts">
import { computed } from 'vue'
import { IconMore } from '@maplejs/icons-vue'

const actionOptions = computed(() => [
  { label: '编辑', value: 'edit' },
  { label: '复制', value: 'copy' },
  { type: 'divider' },
  { label: '删除', value: 'delete' },
])
</script>

<template>
  <mp-dropdown-menu :options="actionOptions">
    <mp-button icon-container aria-label="更多操作">
      <mp-icon><IconMore /></mp-icon>
    </mp-button>
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
