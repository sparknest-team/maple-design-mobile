<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'

const variants = ['neutral', 'tonal', 'solid'] as const
</script>

<template>
  <mp-space>
    <mp-button
      v-for="variant in variants"
      :key="variant"
      @click="Message.success({ content: variant, variant, closable: true })"
      >{{ variant }}</mp-button
    >
  </mp-space>
</template>
