<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'

const time = ref()
const timeWithSeconds = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="timeWithSeconds" format="HH:mm:ss" placeholder="Includes seconds" clearable />
  </mp-space>
</template>
