<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const customStyleSignature = ref('')
const customStyleSignatureRef = ref()
function confirmCustomStyleSignature() {
  customStyleSignature.value = customStyleSignatureRef.value.confirm()
}
function clearCustomStyleSignature() {
  customStyleSignature.value = ''
  customStyleSignatureRef.value.reset()
}
onThemeChange(() => {
  customStyleSignatureRef.value?.reset()
  customStyleSignature.value = ''
})
</script>

<template>
  <mp-signature ref="customStyleSignatureRef" style="color: var(--mp-sys-color-content-primary)" :line-width="4" />
  <mp-space class="gap">
    <mp-button status="primary" @click="confirmCustomStyleSignature">确认</mp-button>
    <mp-button status="primary" @click="clearCustomStyleSignature">重置</mp-button>
  </mp-space>
  <img v-if="customStyleSignature" :src="customStyleSignature" class="gap" />
</template>

<style scoped>
.gap {
  margin-top: 10px !important;
}
</style>
