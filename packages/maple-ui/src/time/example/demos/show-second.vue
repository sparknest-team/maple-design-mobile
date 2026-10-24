<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const time = ref()
const timeWithSeconds = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="timeWithSeconds" format="HH:mm:ss" placeholder="含秒" clearable />
  </mp-space>
</template>
