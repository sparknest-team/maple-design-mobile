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
  <mp-menu :options="actionOptions">
    <mp-button variant="tonal" :elevation="false" aria-label="更多操作"
      ><template #icon>
        <mp-icon><IconMore /></mp-icon></template
    ></mp-button>
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
