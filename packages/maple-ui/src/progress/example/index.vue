<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const value = ref(0)
let timer

watchLang(use)
onThemeChange()

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="20" />
    <mp-progress :percent="value" :track="false" show-text />
    <mp-progress :percent="100" show-text>success</mp-progress>
  </mp-space>

  <app-type>{{ t('style') }}</app-type>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="40" color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)" />
    <mp-progress status="info" :percent="40" />
    <mp-progress status="success" :percent="60" />
    <mp-progress percent="80" stroke-width="8" color="#ff9f00" track-color="#f5cb90" />
  </mp-space>

  <app-type>{{ t('circle') }}</app-type>
  <mp-space :size="['8vmin', '8vmin']">
    <mp-progress
      mode="circle"
      size="18vmin"
      :percent="100"
      :color="{
        '0%': '#3fecff',
        '100%': '#6149f6',
      }"
    />
    <mp-progress mode="circle" :percent="75" size="18vmin" :track="false" />
    <mp-progress mode="circle" show-text :percent="value" stroke-width="5" size="18vmin" />
    <mp-progress mode="circle" status="success" show-text :percent="100" stroke-width="5" size="18vmin">
      success
    </mp-progress>
  </mp-space>

  <app-type>{{ t('indeterminateProgress') }}</app-type>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress indeterminate />
    <mp-progress indeterminate status="info" />

    <mp-space justify="space-between">
      <mp-progress mode="circle" indeterminate size="18vmin" />
      <mp-progress mode="circle" status="info" indeterminate size="18vmin" />
    </mp-space>
  </mp-space>
</template>
