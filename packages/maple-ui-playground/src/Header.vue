<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { Message, StyleProvider } from '@maple-design/ui'
import { downloadProject } from './download/download'
import Close from './icons/Close.vue'
import Download from './icons/Download.vue'
import GitHub from './icons/GitHub.vue'
import Palette from './icons/Palette.vue'
import Share from './icons/Share.vue'
import { normalizeTheme, themeMap } from './themes'
import { usePreviewVersion } from './utils/env'

const props = defineProps(['store', 'theme'])
const emit = defineEmits(['update:theme'])
const inIframe = ref(window.self !== window.top)
const currentVueVersion = ref('')
const currentMapleVersion = ref('')
const vueVersions = ref<string[]>([])
const mapleVersions = ref<string[]>([])
const currentTheme = ref(props.theme)

const themeOptions = ref([
  { 'zh-CN': 'Default 亮色', 'en-US': 'Default Light', value: 'defaultLightTheme' },
  { 'zh-CN': 'Default 暗色', 'en-US': 'Default Dark', value: 'defaultDarkTheme' },
  { 'zh-CN': 'Maple 亮色', 'en-US': 'Maple Light', value: 'mapleLightTheme' },
  { 'zh-CN': 'Maple 暗色', 'en-US': 'Maple Dark', value: 'mapleDarkTheme' },
  { 'zh-CN': 'Alps 乐道', 'en-US': 'Alps Light', value: 'alpsLightTheme' },
  { 'zh-CN': 'Firefly 萤火虫', 'en-US': 'Firefly Light', value: 'fireflyLightTheme' },
  { 'zh-CN': 'Alps 乐道暗色', 'en-US': 'Alps Dark', value: 'alpsDarkTheme' },
  { 'zh-CN': 'Firefly 萤火虫暗色', 'en-US': 'Firefly Dark', value: 'fireflyDarkTheme' },
])

onMounted(() => {
  const initialTheme = getInitialTheme()
  if (initialTheme) {
    emit('update:theme', initialTheme)
    currentTheme.value = initialTheme
  }

  fetchVueVersions()
  fetchMapleVersions()
  nextTick().then(syncTheme)
})

watch(
  () => props.theme,
  () => {
    currentTheme.value = props.theme
    syncTheme()
  },
)
watch(
  () => currentTheme.value,
  () => {
    emit('update:theme', currentTheme.value)
  },
)
watch(() => currentVueVersion.value, setVueVersion)
watch(() => currentMapleVersion.value, setMapleVersion)

async function copyLink() {
  await navigator.clipboard.writeText(location.href)
  Message('Sharable URL has been copied to clipboard')
}

function openGithub() {
  window.open('https://github.com/loca-spirit/maple-design-mobile', '_blank')
}

function notifyEmulatorThemeChange() {
  setTimeout(() => {
    window[0].postMessage({
      action: 'theme-change',
      value: props.theme,
    })
  })
}

function notifyParentThemeChange() {
  if (!inIframe.value) {
    return
  }

  // maple documentation need this
  window.parent.postMessage(
    {
      action: 'theme-change',
      data: props.theme,
      from: 'playground',
    },
    '*',
  )
}

function handleClose() {
  window.parent.postMessage({ action: 'playground-close' }, '*')
}

function getInitialTheme() {
  const search = new URLSearchParams(window.location.search)

  const value = search.get('initialTheme')
  return value === null ? null : normalizeTheme(value)
}

function syncTheme() {
  localStorage.setItem('maple-ui-playground-theme', props.theme)
  StyleProvider.setStyleVars(themeMap[props.theme as keyof typeof themeMap])

  props.theme.toLowerCase().includes('dark')
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
  document.documentElement.setAttribute('theme', props.theme)
  notifyEmulatorThemeChange()
  notifyParentThemeChange()
}

async function fetchVueVersions() {
  const res = await fetch('https://api.github.com/repos/vuejs/core/releases?per_page=100')
  const releases: any[] = await res.json()
  const versions = releases.map((r) => (/^v/.test(r.tag_name) ? r.tag_name.slice(1) : r.tag_name))
  vueVersions.value = versions
}

async function fetchMapleVersions() {
  const res = await fetch('https://api.github.com/repos/loca-spirit/maple-design-mobile/releases?per_page=100')
  const releases: any[] = await res.json()
  const versions = releases
    .map((r) => (/^v/.test(r.tag_name) ? r.tag_name.slice(1) : r.tag_name))
    .filter((version) => !version.startsWith('1'))

  if (usePreviewVersion) {
    versions.unshift('preview')
  }

  mapleVersions.value = versions
}

async function setVueVersion(v: string) {
  await props.store.setVueVersion(v)
}

async function setMapleVersion(v: string) {
  await props.store.setMapleVersion(v)
}
</script>

<template>
  <nav>
    <Close v-if="inIframe" class="close" @click="handleClose" />
    <h1 v-else>
      <img alt="logo" src="./logo.svg" />
      <span>Maple UI Playground</span>
    </h1>
    <mp-space align="center">
      <mp-select
        v-model="currentMapleVersion"
        style="width: 210px"
        :offset-y="8"
        variant="outline"
        size="sm"
        placeholder="Maple Version"
      >
        <mp-option v-for="v in mapleVersions" :key="v" :label="`${v === 'preview' ? '' : 'v'}${v}`" :value="v" />
      </mp-select>
      <mp-select
        v-model="currentVueVersion"
        style="width: 210px"
        :offset-y="8"
        variant="outline"
        size="sm"
        placeholder="Vue Version"
      >
        <mp-option v-for="v in vueVersions" :key="v" :label="`v${v}`" :value="v" />
      </mp-select>

      <mp-menu v-model="currentTheme" placement="bottom" :offset-y="10">
        <mp-button class="link-button" text round>
          <Palette />
        </mp-button>
        <template #content>
          <mp-menu-option v-for="t in themeOptions" :key="t.value" :label="t['en-US']" :value="t.value" />
        </template>
      </mp-menu>

      <mp-tooltip content="Copy Link">
        <mp-button class="link-button" text round @click="copyLink">
          <Share />
        </mp-button>
      </mp-tooltip>

      <mp-tooltip content="Download Project">
        <mp-button class="link-button" text round @click="downloadProject(store)">
          <Download />
        </mp-button>
      </mp-tooltip>

      <mp-tooltip content="Open Github" placement="bottom-end">
        <mp-button class="link-button" text round @click="openGithub">
          <GitHub />
        </mp-button>
      </mp-tooltip>
    </mp-space>
  </nav>
</template>

<style>
nav {
  --bg: #fff;
  --bg-light: #fff;
  --border: #ddd;

  color: var(--base);
  height: var(--nav-height);
  box-sizing: border-box;
  padding: 0 1em;
  background-color: var(--bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark nav {
  --base: #ddd;
  --bg: #1a1a1a;
  --bg-light: #242424;
  --border: #383838;

  box-shadow: none;
  border-bottom: 1px solid var(--border);
}

h1 {
  margin: 0;
  line-height: var(--nav-height);
  font-weight: 500;
  display: flex;
  align-items: center;
}

h1 img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
  position: relative;
}

@media (max-width: 1000px) {
  h1 span {
    display: none;
  }
}

@media (max-width: 700px) {
  .mp-select {
    display: none;
  }
}

.close {
  cursor: pointer;
}

.link-button svg {
  width: 23px;
  height: 23px;
  fill: var(--mp-sys-color-content-primary);
}
</style>
