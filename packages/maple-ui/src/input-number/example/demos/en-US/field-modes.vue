<script setup lang="ts">
import { ref } from 'vue'

const embed = ref(1)
const button = ref(1)
const input = ref(1)
</script>
<template>
  <div class="number-demo">
    <label>Embedded controls<mp-input-number v-model="embed" mode="embed" /></label>
    <label>Split buttons (touch friendly)<mp-input-number v-model="button" mode="button" /></label>
    <label>Input only<mp-input-number v-model="input" mode="input" /></label>
    <p>Hold a button to repeat. Use arrows to step; Enter or blur commits.</p>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
