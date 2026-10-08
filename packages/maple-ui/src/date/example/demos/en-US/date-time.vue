<script setup>
import { ref } from 'vue'

const minute = ref()
const second = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <span>Minute precision: disable use-seconds</span>
    <mp-date v-model="minute" show-time :use-seconds="false" clearable />
    <span>Committed value：{{ minute || 'Not selected' }}</span>
    <span>Second precision: the default on both platforms</span>
    <mp-date v-model="second" show-time use-seconds clearable />
    <span>Committed value：{{ second || 'Not selected' }}</span>
  </mp-space>
</template>
