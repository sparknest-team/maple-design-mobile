<script setup lang="ts">
import { ref } from 'vue'
import type { MenuStrategy } from '@maple-design/ui'

const strategy = ref<MenuStrategy>('fixed')
const options = [
  {
    label: 'Actions',
    children: [
      {
        label: 'Export',
        children: [
          { label: 'CSV', value: 'csv' },
          { label: 'JSON', value: 'json' },
        ],
      },
      { label: 'Copy', value: 'copy' },
    ],
  },
]
</script>

<template>
  <mp-space direction="column">
    <mp-button @click="strategy = strategy === 'fixed' ? 'absolute' : 'fixed'">
      Toggle positioning：{{ strategy }}
    </mp-button>
    <mp-menu :strategy="strategy" :options="options" submenu-trigger="click">
      <mp-button>Open three-level menu</mp-button>
      <template #footer>
        <mp-button variant="text" @click.stop="strategy = strategy === 'fixed' ? 'absolute' : 'fixed'">
          Switch while open：{{ strategy }}
        </mp-button>
      </template>
    </mp-menu>
    <small
      >The strategy applies to every submenu. The mounting container is controlled separately by popup-container.</small
    >
  </mp-space>
</template>
