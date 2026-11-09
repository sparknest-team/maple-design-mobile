<script setup>
import { ref } from 'vue'

const items = ref([
  {
    name: 'Vue2',
    icon: 'star-fill',
    enabled: false,
  },
  {
    name: 'Vue3',
    icon: 'heart-fill',
    enabled: false,
  },
  {
    name: 'React',
    icon: 'close-circle-fill',
    enabled: false,
  },
])
const handleClick = (item) => {
  item.enabled = !item.enabled
}
</script>

<template>
  <mp-paper :elevation="2">
    <mp-cell
      v-for="(item, index) in items"
      :key="item.name"
      ripple
      :action-aria-label="`查看${item.name}`"
      :border="index !== items.length - 1"
      :border-offset="0"
      @click="handleClick(item)"
    >
      {{ item.name }}

      <template #icon>
        <m-icon-star-fill v-if="item.icon === 'star-fill'" />
        <m-icon-heart-fill v-else-if="item.icon === 'heart-fill'" />
        <m-icon-close-circle-fill v-else />
      </template>

      <template #extra>
        <mp-switch v-model="item.enabled" @click.stop />
      </template>
    </mp-cell>
  </mp-paper>
</template>
