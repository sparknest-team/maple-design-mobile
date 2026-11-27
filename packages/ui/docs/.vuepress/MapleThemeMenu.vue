<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { usePageLang, useRoutes } from 'vuepress/client'
import { useRoute, useRouter } from 'vue-router'
import { DocsNavbarTools } from '@sparknest/ui-doc-preview-vue'
import { useDarkMode } from 'vuepress-theme-hope/composables/useDarkMode'
import config from '@config'
import { currentTheme, getBrowserTheme, persistTheme, setTheme, type Theme } from '@maple-design/cli-vue/docs/theme'

const language = usePageLang()
const pages = useRoutes()
const route = useRoute()
const router = useRouter()
const locale = computed(() => (language.value === 'en-US' ? 'en-US' : 'zh-CN'))
const themeOptions = computed(() =>
  config.pc.header.themes.map((theme) => ({
    value: theme.value,
    label: theme[locale.value],
  })),
)
function selectLanguage(value: string) {
  if (value === locale.value) {
    return
  }
  const page = route.path.replace(/^\/(?:zh-CN|en-US)(?=\/|$)/, '') || '/'
  const path = '/' + value + page
  const localized = Object.hasOwn(pages.value, path)
  void router.push({
    path: localized ? path : '/' + value + '/',
    query: route.query,
    hash: localized ? route.hash : '',
  })
}
const { status } = useDarkMode()
function apply(theme: Theme) {
  setTheme(theme)
  status.value = theme.toLowerCase().includes('dark') ? 'dark' : 'light'
}
function select(value: string) {
  const theme = config.pc.header.themes.find((option) => option.value === value)?.value as Theme | undefined
  if (!theme) {
    return
  }
  apply(theme)
  persistTheme(theme, 'site')
  persistTheme(theme, 'demo')
}
function syncStoredTheme() {
  const theme = getBrowserTheme('site')
  if (currentTheme.value !== theme) {apply(theme)}
}
onMounted(() => {
  apply(getBrowserTheme('site'))
  window.addEventListener('storage', syncStoredTheme)
})
onBeforeUnmount(() => window.removeEventListener('storage', syncStoredTheme))
</script>

<template>
  <DocsNavbarTools
    class="maple-docs-tools"
    :repository="config.pc.header.github"
    :language="locale"
    :theme="currentTheme ?? config.defaultLightTheme"
    :themes="themeOptions"
    @theme-change="select"
    @language-change="selectLanguage"
  />
</template>

<style scoped>
.maple-docs-tools {
  --docs-tools-text: var(--vp-c-text);
  --docs-tools-bg: var(--vp-c-bg);
  --docs-tools-border: var(--vp-c-border);
  --docs-tools-brand: var(--vp-c-accent);
  --docs-tools-hover: var(--vp-c-control-hover, #8882);
}
</style>
