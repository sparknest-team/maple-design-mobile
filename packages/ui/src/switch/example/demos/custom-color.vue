<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <mp-switch v-model="enabled" checked-color="#005f73" unchecked-color="#9b2226" aria-label="Custom color switch" />
</template>
