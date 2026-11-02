<script setup>
import { ref } from 'vue'

const accepted = ref([30, 70])
const proposed = ref(50)
</script>
<template>
  <mp-space direction="column" size="28px" style="padding: 24px 12px">
    <mp-slider v-model="accepted" range show-tooltip="always" :aria-label="['Minimum', 'Maximum']" />
    <mp-slider :model-value="50" aria-label="Controlled rejection" @update:model-value="proposed = $event" />
    <output>{{ proposed }}</output>
    <mp-slider :default-value="40" readonly aria-label="Read only" />
    <mp-slider :default-value="40" disabled aria-label="Disabled" />
  </mp-space>
</template>
