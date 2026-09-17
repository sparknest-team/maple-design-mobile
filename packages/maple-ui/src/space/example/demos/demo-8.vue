<script setup></script>

<template>
  <mp-space v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" :size="size" wrap>
    <span>{{ size }}</span
    ><span>Item 1</span><span>Item 2</span>
  </mp-space>
</template>
