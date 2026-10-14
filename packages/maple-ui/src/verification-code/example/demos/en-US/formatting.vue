<script setup>
import { ref } from 'vue'

const code = ref('')
const transform = (value) => value.replace(/[-\s]/g, '').toUpperCase()
</script>
<template>
  <div class="verification-demo">
    <p>Paste ab-12-cd; insertion starts at the current cell.</p>
    <mp-verification-code
      v-model="code"
      type="alphanumeric"
      :paste-transform="transform"
      :formatter="(char) => char.toUpperCase()"
      aria-label="Alphanumeric verification code"
      ><template #separator="{ index }"><span v-if="index === 2">−</span></template></mp-verification-code
    >
    <p>{{ code }}</p>
  </div>
</template>
<style scoped>
.verification-demo {
  max-width: 420px;
}
</style>
