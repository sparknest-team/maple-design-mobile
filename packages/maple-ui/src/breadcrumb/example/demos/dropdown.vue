<template>
  <mp-space direction="column">
    <mp-breadcrumb :routes="routes" @click.prevent @select="handleSelect" />
    <span v-if="selectedPath">Selected: {{ selectedPath }}</span>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item :droplist="droplist"> Channel </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>
        <template #droplist>
          <mp-menu-option>Option 1</mp-menu-option>
          <mp-menu-option>Option 2</mp-menu-option>
          <mp-menu-option>Option 3</mp-menu-option>
        </template>
        Channel
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const selectedPath = ref('')
    const handleSelect = (route: { path: string }) => {
      selectedPath.value = route.path
    }
    const routes = [
      {
        path: '/',
        label: 'Home',
      },
      {
        path: '/channel',
        label: 'Channel',
        children: [
          { path: '/goods', label: 'Goods' },
          { path: '/wallet', label: 'Wallet' },
        ],
      },
      {
        path: '/news',
        label: 'News',
      },
    ]
    const droplist = [
      {
        path: '/goods',
        label: 'Goods',
      },
      {
        path: '/wallet',
        label: 'Wallet',
      },
    ]
    return { routes, droplist, selectedPath, handleSelect }
  },
}
</script>
