<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'
import { codeToHtml } from '../highlighter'

const rootTheme = ref('vitesse-light')
const customTheme = ref('github-light')
onThemeChange((theme) => {
  if (theme.toLocaleLowerCase().includes('dark')) {
    rootTheme.value = 'vitesse-dark'
    customTheme.value = 'github-dark'
  } else {
    rootTheme.value = 'vitesse-light'
    customTheme.value = 'github-light'
  }
})
</script>

<template>
  <mp-highlighter-provider :highlighter="{ codeToHtml }" :theme="rootTheme">
    <mp-space direction="column" size="lg">
      <mp-code code="console.log('Hello Maple UI')" language="javascript" />
      <mp-code code="print('Hello Maple UI')" language="python" />
      <mp-code code="console.log('Hello Maple UI')" language="javascript" :theme="customTheme" />
    </mp-space>
  </mp-highlighter-provider>
</template>
