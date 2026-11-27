<script setup lang="ts">
import Layout from 'vuepress-theme-hope/layouts/base/Layout'
import { currentThemePreset, currentStyleVars } from '@maple-design/cli-vue/docs/theme'
import ThemeProvider from '../../src/theme-provider'
</script>
<template>
  <ThemeProvider :theme="currentThemePreset" :style="{ ...currentStyleVars, display: 'contents' }">
    <Layout>
      <template v-if="$slots.default" #default><slot /></template>
    </Layout>
  </ThemeProvider>
</template>
