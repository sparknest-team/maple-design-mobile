<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">显示背景层</mp-button>
  <mp-overlay v-model:open="open" />
</template>
