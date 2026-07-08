<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const signature = ref('')
const signatureRef = ref()

const customStyleSignature = ref('')
const customStyleSignatureRef = ref()

watchLang(use)
onThemeChange(() => {
  signatureRef.value?.reset()
  customStyleSignatureRef.value?.reset()
  signature.value = ''
  customStyleSignature.value = ''
})

function confirmSignature() {
  signature.value = signatureRef.value.confirm()
}

function resetSignature() {
  signature.value = ''
  signatureRef.value.reset()
}

function confirmCustomStyleSignature() {
  customStyleSignature.value = customStyleSignatureRef.value.confirm()
}

function clearCustomStyleSignature() {
  customStyleSignature.value = ''
  customStyleSignatureRef.value.reset()
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-signature ref="signatureRef" />
  <mp-space class="gap">
    <mp-button type="primary" @click="confirmSignature">{{ t('confirm') }}</mp-button>
    <mp-button type="primary" @click="resetSignature">{{ t('reset') }}</mp-button>
  </mp-space>
  <img v-if="signature" class="gap" :src="signature" />

  <app-type>{{ t('customStyle') }}</app-type>
  <mp-signature ref="customStyleSignatureRef" style="color: var(--mp-color-primary)" :line-width="4" />
  <mp-space class="gap">
    <mp-button type="primary" @click="confirmCustomStyleSignature">{{ t('confirm') }}</mp-button>
    <mp-button type="primary" @click="clearCustomStyleSignature">{{ t('reset') }}</mp-button>
  </mp-space>
  <img v-if="customStyleSignature" :src="customStyleSignature" class="gap" />
</template>

<style scoped>
.gap {
  margin-top: 10px !important;
}
</style>
