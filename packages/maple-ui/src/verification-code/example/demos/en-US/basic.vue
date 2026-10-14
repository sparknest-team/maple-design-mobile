<script setup>
import { ref } from 'vue'

const code = ref('')
</script>
<template>
  <div class="verification-demo">
    <mp-verification-code v-model="code" aria-label="verification code" />
    <p>Value: {{ code || 'empty' }}</p>
  </div>
</template>
<style scoped>
.verification-demo {
  max-width: 420px;
}
</style>
