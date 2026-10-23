<script setup lang="ts">
import { computed } from 'vue'

const submenuOptions = computed(() => [
  { label: '首页', value: 'home' },
  {
    label: '产品',
    children: [
      { label: '产品概览', value: 'overview' },
      {
        label: '解决方案',
        children: [
          { label: '企业版', value: 'enterprise' },
          { label: '团队版', value: 'team' },
        ],
      },
    ],
  },
  { label: '关于我们', value: 'about' },
])
</script>

<template>
  <mp-menu :options="submenuOptions">
    <mp-button>多级菜单</mp-button>
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
