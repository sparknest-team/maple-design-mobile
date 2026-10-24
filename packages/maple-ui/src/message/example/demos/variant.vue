<script setup lang="ts">
import { Message } from '@maple-design/ui'

const variants = ['neutral', 'tonal', 'solid'] as const
</script>

<template>
  <mp-space wrap>
    <mp-button @click="Message.success({ content: 'neutral (default)', closable: true })">neutral (default)</mp-button>
    <mp-button
      v-for="variant in variants"
      :key="variant"
      @click="Message.success({ content: variant, variant, closable: true })"
      >{{ variant }}</mp-button
    >
  </mp-space>
</template>
