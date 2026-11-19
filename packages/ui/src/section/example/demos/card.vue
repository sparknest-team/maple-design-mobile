<script setup lang="ts">
import { copy } from '../messages'
</script>

<template>
  <mp-section variant="card" show-marker :heading-level="3">
    <template #title>{{ copy.history }}</template>
    <template #description>{{ copy.latestRelease }}</template>
    <p>{{ copy.exportRelease }}</p>
  </mp-section>
</template>
