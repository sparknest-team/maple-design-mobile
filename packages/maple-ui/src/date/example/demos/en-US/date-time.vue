<script setup>
import { ref } from 'vue'

const minute = ref()
const second = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <span>Time columns: hour / minute</span>
    <mp-date
      v-model="minute"
      show-time
      :time-fields="['hour', 'minute']"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      clearable
    />
    <span>Committed value：{{ minute || 'Not selected' }}</span>
    <span>Second precision: the default on both platforms</span>
    <mp-date v-model="second" show-time :time-fields="['hour', 'minute', 'second']" clearable />
    <span>Committed value：{{ second || 'Not selected' }}</span>
  </mp-space>
</template>
