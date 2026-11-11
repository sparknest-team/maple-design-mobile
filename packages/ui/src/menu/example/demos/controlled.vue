<script setup lang="ts">
import { ref } from 'vue'

const controlledOpen = ref(false)
</script>

<template>
  <mp-space direction="column">
    <mp-button @mousedown.stop @click.stop="controlledOpen = !controlledOpen">
      {{ controlledOpen ? '关闭菜单' : '打开菜单' }}
    </mp-button>

    <mp-menu v-model:open="controlledOpen">
      <mp-button>菜单触发器</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-menu>
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
