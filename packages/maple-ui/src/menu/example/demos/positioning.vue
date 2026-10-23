<script setup lang="ts">
import { ref } from 'vue'
import type { MenuStrategy } from '@maplejs/maple-ui'

const strategy = ref<MenuStrategy>('fixed')
const options = [
  {
    label: '操作',
    children: [
      {
        label: '导出',
        children: [
          { label: 'CSV', value: 'csv' },
          { label: 'JSON', value: 'json' },
        ],
      },
      { label: '复制', value: 'copy' },
    ],
  },
]
</script>

<template>
  <mp-space direction="column">
    <mp-button @click="strategy = strategy === 'fixed' ? 'absolute' : 'fixed'"> 切换定位：{{ strategy }} </mp-button>
    <mp-menu :strategy="strategy" :options="options" submenu-trigger="click">
      <mp-button>打开三级菜单</mp-button>
      <template #footer>
        <mp-button variant="text" @click.stop="strategy = strategy === 'fixed' ? 'absolute' : 'fixed'">
          展开时切换：{{ strategy }}
        </mp-button>
      </template>
    </mp-menu>
    <small>所有层级继承同一定位策略；挂载容器仍由 popup-container 单独控制。</small>
  </mp-space>
</template>
