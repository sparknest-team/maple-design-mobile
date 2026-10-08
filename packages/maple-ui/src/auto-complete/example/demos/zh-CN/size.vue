<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete v-for="size in sizes" :key="size" :size="size" :options="options" :placeholder="size" />
  </mp-space>
</template>

<script setup lang="ts">
import type { ComponentSize } from '@maplejs/maple-ui'

const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const options = ['Beijing', 'Shanghai', 'Chengdu']
</script>
