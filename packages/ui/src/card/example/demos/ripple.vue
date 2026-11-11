<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
</script>

<template>
  <mp-card ripple title="Click this card" @click="clicks++"
    >Clicks: <output aria-live="polite">{{ clicks }}</output></mp-card
  >
</template>
