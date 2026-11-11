<script setup>
import { ref } from 'vue'

const code = ref('')
</script>
<template>
  <div class="verification-demo">
    <mp-verification-code v-model="code" aria-label="验证码" />
    <p>当前值：{{ code || '未输入' }}</p>
  </div>
</template>
<style scoped>
.verification-demo {
  max-width: 420px;
}
</style>
