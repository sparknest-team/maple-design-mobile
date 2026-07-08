<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { codeToHtml } from 'shiki'
import { t, use } from './locale'

const rootTheme = ref('vitesse-light')
const customTheme = ref('github-light')

watchLang(use)
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
    <app-type>{{ t('basicUsage') }}</app-type>

    <mp-space direction="column" size="large">
      <mp-code code="console.log('Hello Maple UI')" language="javascript" />
      <mp-code code="print('Hello Maple UI')" language="python" />
      <mp-code code="console.log('Hello Maple UI')" language="javascript" :theme="customTheme" />
    </mp-space>

    <app-type>{{ t('wordWrap') }}</app-type>
    <mp-code code="console.log('Hello Maple UI');console.log('Hello Maple UI');" language="javascript" word-wrap />
  </mp-highlighter-provider>
</template>
