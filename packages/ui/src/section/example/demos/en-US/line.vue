<template>
  <mp-section title="Release history">
    <template #extra>
      <mp-button :aria-expanded="expanded" @click="expanded = !expanded">
        {{ expanded ? 'Show latest' : 'Show all' }}
      </mp-button>
    </template>
    <ul>
      <li>v1.2 · Added project export</li>
      <li v-if="expanded">v1.1 · Added member management</li>
    </ul>
  </mp-section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
</script>
