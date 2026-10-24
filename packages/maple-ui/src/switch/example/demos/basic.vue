<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <mp-space wrap
    ><mp-switch v-model="enabled" aria-label="Enable notifications" /><output>{{ enabled }}</output
    ><mp-switch :default-value="true" aria-label="Initially enabled"
  /></mp-space>
</template>
