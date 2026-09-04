<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

function setTheme(theme) {
  window.toggleTheme(theme)
}
</script>

<template>
  <app-type>{{ t('toggleTheme') }}</app-type>
  <mp-space direction="column" size="large">
    <mp-button status="primary" block @click="setTheme('lightTheme')">Material Design 2 {{ t('light') }}</mp-button>
    <mp-button status="primary" block @click="setTheme('darkTheme')">Material Design 2 {{ t('dark') }}</mp-button>
    <mp-button status="primary" block @click="setTheme('md3LightTheme')">Material Design 3 {{ t('light') }}</mp-button>
    <mp-button status="primary" block @click="setTheme('md3DarkTheme')">Material Design 3 {{ t('dark') }}</mp-button>
  </mp-space>
</template>
