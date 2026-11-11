<script setup lang="ts">
import { ref } from 'vue'

const showIcon = ref(true)
const showDescription = ref(true)
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-button @click="showIcon = !showIcon">Toggle icon</mp-button>
      <mp-button @click="showDescription = !showDescription">Toggle description</mp-button>
    </mp-space>
    <mp-empty
      data-demo-empty
      description="Dynamic empty state"
      :show-icon="showIcon"
      :show-description="showDescription"
    />
  </mp-space>
</template>
