<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
  </mp-space>
</template>
