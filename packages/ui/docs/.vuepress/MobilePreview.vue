<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const ready = ref(false)
const open = ref(false)
const loaded = ref(false)
const frame = ref<HTMLIFrameElement>()
const initialUrl = ref('')
const href = computed(() => router.resolve(route.fullPath).href)
const language = computed(() => (route.path.startsWith('/en-US/') ? 'en-US' : 'zh-CN'))
const title = computed(() => (language.value === 'en-US' ? 'Mobile preview' : '手机预览'))
const outline = computed(() => (language.value === 'en-US' ? 'On this page' : '本页目录'))
// Route both windows through their own Vue Router so navigation keeps the
// preview mounted. The ready message also catches changes during hydration.
function navigatePreview() {
  frame.value?.contentWindow?.postMessage({ mapleDocsNavigate: route.fullPath }, location.origin)
}
watch(href, navigatePreview)

function syncRoute(event: MessageEvent) {
  if (!frame.value || event.source !== frame.value.contentWindow || event.origin !== location.origin) {return}
  if (event.data?.mapleDocsReady) {
    navigatePreview()
    return
  }
  const path = event.data?.mapleDocsPath
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {return}
  if (path !== route.fullPath) {void router.replace(path)}
}

const storageKey = 'MAPLE_UI_DOC_PANEL_MODE'
function showPreview(value: boolean) {
  open.value = value
  if (value && !loaded.value) {
    initialUrl.value = href.value
    loaded.value = true
  }
  try {
    localStorage.setItem(storageKey, value ? 'preview' : 'outline')
  } catch {
    /* storage is optional */
  }
}
let viewport: MediaQueryList | undefined
function syncViewport() {
  ready.value = viewport?.matches ?? false
  if (ready.value) {initialUrl.value = href.value}
}
onMounted(() => {
  if (window.parent !== window) {return}
  viewport = matchMedia('(min-width: 720px)')
  viewport.addEventListener('change', syncViewport)
  window.addEventListener('message', syncRoute)
  initialUrl.value = href.value
  open.value = matchMedia('(min-width: 1150px)').matches
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      open.value = saved === 'preview'
    }
  } catch {
    /* use viewport default */
  }
  loaded.value = open.value
  syncViewport()
})
onBeforeUnmount(() => {
  window.removeEventListener('message', syncRoute)
  viewport?.removeEventListener('change', syncViewport)
})
</script>

<template>
  <aside v-if="ready" class="maple-phone" :class="{ 'maple-phone--open': open }">
    <div class="maple-phone-toolbar" :aria-label="title" role="group">
      <button type="button" :aria-pressed="open" @click="showPreview(true)">{{ title }}</button>
      <button type="button" :aria-pressed="!open" @click="showPreview(false)">{{ outline }}</button>
    </div>
    <iframe v-if="loaded" v-show="open" id="mobile" ref="frame" :src="initialUrl" :title="title" />
  </aside>
</template>

<style scoped>
.maple-phone {
  position: fixed;
  z-index: 12;
  right: 1rem;
  bottom: 1rem;
  max-width: calc(100vw - 2rem);
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
}
.maple-phone-toolbar {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
}
.maple-phone button {
  font: inherit;
  cursor: pointer;
  background: transparent;
  color: inherit;
  border: 0;
  border-bottom: 2px solid transparent;
  padding: 0.375rem 0;
}
.maple-phone button[aria-pressed='true'] {
  border-color: currentColor;
  font-weight: 600;
}
.maple-phone iframe {
  display: block;
  border: 0;
  width: min(375px, calc(100vw - 2rem));
  height: min(70vh, 760px);
  box-shadow: 0 4px 16px #0002;
}
@media (min-width: 1150px) {
  .maple-phone {
    right: clamp(12px, 2.5vw, 38px);
    top: calc(var(--navbar-height, 3.75rem) + 1rem);
    bottom: auto;
    width: clamp(300px, 27vw, 375px);
  }
  .maple-phone iframe {
    width: 100%;
    height: calc(100dvh - var(--navbar-height, 3.75rem) - 5rem);
  }
  :global(body:has(.maple-phone--open) .vp-page) {
    padding-inline-end: calc(clamp(300px, 27vw, 375px) + 3rem);
  }
  :global(body:has(.maple-phone--open) .vp-toc-placeholder) {
    display: none;
  }
  :global(body:has(.maple-phone) .vp-toc-placeholder) {
    margin-top: 3.5rem;
  }
}
</style>
