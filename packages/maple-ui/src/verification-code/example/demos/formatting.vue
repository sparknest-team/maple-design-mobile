<script setup>
import { ref } from 'vue'

const code = ref('')
const transform = (value) => value.replace(/[-\s]/g, '').toUpperCase()
</script>
<template>
  <div class="verification-demo">
    <p>可粘贴 ab-12-cd；从当前格开始写入。</p>
    <mp-verification-code
      v-model="code"
      type="alphanumeric"
      :paste-transform="transform"
      :formatter="(char) => char.toUpperCase()"
      aria-label="字母数字验证码"
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
