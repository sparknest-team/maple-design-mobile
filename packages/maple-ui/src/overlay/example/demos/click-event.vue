<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maple-design/ui'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">点击背景层</mp-button>
  <mp-overlay v-model:open="open" @click="Message.success('点击了背景层')" />
</template>
