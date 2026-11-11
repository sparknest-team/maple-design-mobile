<script setup>
import { ref } from 'vue'

const bordered = ref(false)
const round = ref(false)
const explicitRadius = ref(false)
const elevated = ref(false)
const clicks = ref(0)
</script>

<template>
  <section class="paper-live-demo">
    <div class="controls">
      <mp-checkbox v-model="bordered" edit-mode="direct">Paper border</mp-checkbox>
      <mp-checkbox v-model="round" edit-mode="direct">Round paper</mp-checkbox>
      <mp-checkbox v-model="explicitRadius" edit-mode="direct">Explicit radius</mp-checkbox>
      <mp-checkbox v-model="elevated" edit-mode="direct">Paper shadow</mp-checkbox>
    </div>
    <p role="status">Surface clicks: {{ clicks }}</p>
    <mp-paper
      data-testid="live-paper"
      :bordered="bordered"
      :round="round"
      :radius="explicitRadius ? '12' : undefined"
      :elevation="elevated ? 2 : false"
      width="160"
      :height="100"
      @click="clicks++"
    >
      <mp-button html-type="button">Surface action</mp-button>
    </mp-paper>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
[data-testid='live-paper'] {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
