<script setup lang="ts">
import { ref } from 'vue'
import VerificationCode from '@maple-design/ui/verification-code'

const value = ref<string | null>(null)
function change(next: string | null) {
  void next
}
function finish(next: string) {
  void next
}
function open(next: boolean) {
  void next
}
</script>
<template>
  <VerificationCode v-model="value" :empty-value="null" @change="change" @finish="finish" @open-change="open">
    <template #read="{ value, text }">{{ value?.length }} {{ text }}</template>
    <template #separator="{ index, character }">{{ index }} {{ character }}</template>
  </VerificationCode>
</template>
