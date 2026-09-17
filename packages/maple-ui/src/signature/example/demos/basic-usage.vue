<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'

const signature = ref('')
const signatureRef = ref()
function confirmSignature() {
  signature.value = signatureRef.value.confirm()
}
function resetSignature() {
  signature.value = ''
  signatureRef.value.reset()
}
onThemeChange(() => {
  signatureRef.value?.reset()
  signature.value = ''
})
</script>

<template>
  <mp-signature ref="signatureRef" />
  <mp-space class="gap">
    <mp-button status="primary" @click="confirmSignature">确认</mp-button>
    <mp-button status="primary" @click="resetSignature">重置</mp-button>
  </mp-space>
  <img v-if="signature" class="gap" :src="signature" />
</template>

<style scoped>
.gap {
  margin-top: 10px !important;
}
</style>
