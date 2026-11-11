<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'
import { codeToHtml } from '../highlighter'

const rootTheme = ref('vitesse-light')
onThemeChange((theme) => {
  if (theme.toLocaleLowerCase().includes('dark')) {
    rootTheme.value = 'vitesse-dark'
  } else {
    rootTheme.value = 'vitesse-light'
  }
})
</script>

<template>
  <mp-highlighter-provider :highlighter="{ codeToHtml }" :theme="rootTheme">
    <mp-code code="console.log('Hello Maple UI');console.log('Hello Maple UI');" language="javascript" word-wrap />
  </mp-highlighter-provider>
</template>
