<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()

function setTheme(theme) {
  window.toggleTheme(theme)
}
</script>

<template>
  <app-type>{{ english ? 'Toggle Theme' : '切换主题' }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" block @click="setTheme('lightTheme')"
      >Material Design 2 {{ english ? 'Light' : '亮色' }}</mp-button
    >
    <mp-button status="primary" block @click="setTheme('darkTheme')"
      >Material Design 2 {{ english ? 'Dark' : '暗色' }}</mp-button
    >
    <mp-button status="primary" block @click="setTheme('md3LightTheme')"
      >Material Design 3 {{ english ? 'Light' : '亮色' }}</mp-button
    >
    <mp-button status="primary" block @click="setTheme('md3DarkTheme')"
      >Material Design 3 {{ english ? 'Dark' : '暗色' }}</mp-button
    >
  </mp-space>
</template>
