<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maplejs/maple-cli/client'
import { codeToHtml } from 'shiki'

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
