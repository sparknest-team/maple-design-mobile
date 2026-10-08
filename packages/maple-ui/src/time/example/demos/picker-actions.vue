<script setup>
import { ref } from 'vue'

const date = ref('17:36')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm">
    <template #actions="{ confirm, canConfirm }">
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">确认</mp-button>
    </template>
  </mp-time-picker>
</template>
