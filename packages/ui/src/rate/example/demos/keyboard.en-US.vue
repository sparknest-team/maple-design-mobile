<script setup>
import { ref } from 'vue'

const score = ref(2.5)
</script>

<template>
  <mp-space direction="column">
    <p>
      Tab to focus; arrows change half a point; Home resets, End selects the maximum. Click the current rating again to
      clear.
    </p>
    <mp-rate v-model="score" allow-half clearable aria-label="Service rating" />
    <span>Current rating: {{ score }}</span>
    <mp-rate :default-value="3" readonly aria-label="Readonly rating" />
    <mp-rate :default-value="3" disabled aria-label="Disabled rating" />
  </mp-space>
</template>
