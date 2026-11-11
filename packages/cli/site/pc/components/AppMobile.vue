<template>
  <div class="maple-site-mobile">
    <div class="maple-site-mobile-toolbar" role="group" :aria-label="language === 'en-US' ? 'Right panel' : '右侧面板'">
      <button type="button" :aria-pressed="showPreview" @click="showMobilePreview">
        {{ language === 'en-US' ? 'Mobile preview' : '移动预览' }}
      </button>
      <button type="button" :aria-pressed="!showPreview" @click="mode = 'outline'">
        {{ language === 'en-US' ? 'On this page' : '本页目录' }}
      </button>
    </div>
    <div v-show="showPreview" class="maple-site-mobile-content">
      <iframe
        id="mobile"
        ref="previewFrame"
        @load="followPendingDemo"
        :title="language === 'en-US' ? 'Mobile preview' : '移动端预览'"
        :src="
          mobilePreviewUrl(getMobileIndex(), componentName || '', language || 'zh-CN', replace || '', hash, query ?? {})
        "
      ></iframe>
    </div>
    <app-outline
      v-show="!showPreview"
      :root="docRoot"
      :visible="!showPreview"
      :page-key="pageKey"
      :language="language"
      @navigate="emit('navigate', $event)"
      @active-change="emit('active-change', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { getMobileIndex } from '@maple-design/cli-vue/client'
import AppOutline from './AppOutline.vue'
import { mobilePreviewUrl } from './mobile-preview-url'
import { currentMobileDemo } from './preview-section'

const props = defineProps<{
  query?: Record<string, unknown>
  componentName?: string
  language?: string
  replace?: string
  hash?: string
  docRoot?: HTMLElement | null
  pageKey?: string
}>()
const emit = defineEmits<{ navigate: [id: string]; 'active-change': [id: string] }>()
const previewFrame = ref<HTMLIFrameElement | null>(null)
let pendingDemo: string | undefined
let demoObserver: MutationObserver | undefined

function cancelPendingDemo() {
  pendingDemo = undefined
  demoObserver?.disconnect()
  demoObserver = undefined
}

function followPendingDemo() {
  demoObserver?.disconnect()
  if (!pendingDemo || !showPreview.value) return
  const frame = previewFrame.value
  const doc = frame?.contentDocument
  const view = frame?.contentWindow
  if (!doc || !view) return
  const target = Array.from(doc.querySelectorAll<HTMLElement>('[data-demo]')).find(
    (element) => element.dataset.demo === pendingDemo,
  )
  if (target) {
    const headerHeight = doc.querySelector('.mobile-page-header')?.getBoundingClientRect().height ?? 0
    view.scrollTo({
      top: Math.max(0, view.scrollY + target.getBoundingClientRect().top - headerHeight - 12),
      behavior: 'smooth',
    })
    cancelPendingDemo()
  } else {
    // The iframe can finish loading before its async Vue route has mounted.
    demoObserver = new MutationObserver(followPendingDemo)
    demoObserver.observe(doc, { childList: true, subtree: true })
  }
}

async function showMobilePreview() {
  if (showPreview.value) return
  const demoId = currentMobileDemo(props.docRoot)
  mode.value = 'preview'
  await nextTick()
  if (!showPreview.value || !demoId) return
  pendingDemo = decodeURIComponent(demoId)
  followPendingDemo()
}

watch(() => [props.pageKey, props.componentName, props.language], cancelPendingDemo)
onBeforeUnmount(cancelPendingDemo)

const modeStorageKey = 'MAPLE_UI_DOC_PANEL_MODE'
function savedMode(): 'preview' | 'outline' {
  try {
    return localStorage.getItem(modeStorageKey) === 'outline' ? 'outline' : 'preview'
  } catch {
    return 'preview'
  }
}
const mode = ref(savedMode())
watch(
  mode,
  (value) => {
    if (value === 'outline') cancelPendingDemo()
    try {
      localStorage.setItem(modeStorageKey, value)
    } catch {
      // Keep switching available when browser storage is disabled.
    }
  },
  { flush: 'sync' },
)
const showPreview = computed(() => mode.value === 'preview')
</script>

<style lang="less">
.maple-site-mobile {
  display: flex;
  flex-direction: column;
  position: sticky;
  flex: 0 1 clamp(300px, 27vw, 375px);
  min-width: 0;
  top: 80px;
  height: calc(100vh - 100px);
  margin-right: clamp(12px, 2.5vw, 38px);
  overflow: visible;
  margin-top: 20px;

  &-toolbar {
    display: flex;
    flex-shrink: 0;
    gap: 20px;
    padding: 8px 16px;

    button {
      min-height: 36px;
      padding: 6px 0;
      border: 0;
      background: transparent;
      color: var(--site-config-color-sub-text);
      font: inherit;
      font-size: 13px;
      cursor: pointer;

      &:hover {
        color: var(--site-config-color-text);
      }

      &[aria-pressed='true'] {
        color: var(--site-config-color-text);
        font-weight: 600;
      }

      &:focus-visible {
        outline: 2px solid var(--site-config-color-text);
        outline-offset: -2px;
      }
    }
  }

  &-content,
  .maple-site-outline {
    flex: 1;
    min-height: 0;
  }

  &-content {
    width: 100%;
    margin-top: 8px;
    overflow: hidden;
    border-radius: 2px;
    background: var(--site-config-color-bar);
    box-shadow: 0 4px 16px var(--site-config-color-shadow);
  }

  &-image {
    width: 100%;
    pointer-events: none;
    height: 100%;
    top: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
