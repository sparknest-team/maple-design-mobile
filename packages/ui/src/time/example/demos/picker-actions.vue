<script setup>
import { ref } from 'vue'

const date = ref('17:36')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm">
    <template #actions="{ confirm, canConfirm, selectNow, nowDisabled }">
      <mp-button variant="text" :disabled="nowDisabled" @click="selectNow">此刻</mp-button>
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">确认</mp-button>
    </template>
  </mp-time-picker>
  <p>已确认：{{ date }}</p>
</template>
