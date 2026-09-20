<script setup>
import { computed, ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
function setTheme(theme) {
  window.toggleTheme(theme)
}
</script>

<template>
  <app-type>{{ english ? 'Toggle Theme' : '切换主题' }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" block @click="setTheme('lightTheme')">{{
      english ? 'Default Light' : '默认亮色'
    }}</mp-button>
    <mp-button status="primary" block @click="setTheme('darkTheme')">{{
      english ? 'Default Dark' : '默认暗色'
    }}</mp-button>
    <mp-button status="primary" block @click="setTheme('mapleLightTheme')">{{
      english ? 'Maple Light' : '枫叶亮色'
    }}</mp-button>
    <mp-button status="primary" block @click="setTheme('mapleDarkTheme')">{{
      english ? 'Maple Dark' : '枫叶暗色'
    }}</mp-button>
  </mp-space>
</template>
