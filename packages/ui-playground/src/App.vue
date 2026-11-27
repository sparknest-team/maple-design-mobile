<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { ThemeProvider } from '@maple-design/ui-vue'
import { Repl } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import Header from './Header.vue'
import { createMapleStore } from './store'
import { normalizeTheme, themeMap } from './themes'

const store = createMapleStore(location.hash.slice(1))
const theme = ref(normalizeTheme(localStorage.getItem('maple-ui-playground-theme')))

function setVH() {
  document.documentElement.style.setProperty('--vh', window.innerHeight + `px`)
}

window.addEventListener('resize', setVH)
setVH()

// persist state
watchEffect(() => history.replaceState({}, '', store.serialize()))
</script>

<template>
  <ThemeProvider :theme="themeMap[theme]">
    <Header v-model:theme="theme" :store="store" />
    <Repl
      :editor="Monaco"
      :store="store"
      :theme="theme?.toLowerCase().includes('dark') ? 'dark' : 'light'"
      :show-compile-output="true"
      :auto-resize="true"
      :clear-console="false"
      @keydown.ctrl.s.prevent
      @keydown.meta.s.prevent
    />
  </ThemeProvider>
</template>

<style>
*::-webkit-scrollbar {
  display: none;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  margin: 0;

  --base: #444;
  --nav-height: 60px;

  color: var(--mp-sys-color-content-primary);
}

.vue-repl {
  --color-branding: #5580f8 !important;
  --color-branding-dark: #5580f8 !important;

  height: calc(var(--vh) - var(--nav-height)) !important;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
