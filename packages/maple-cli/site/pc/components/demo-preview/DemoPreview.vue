<script setup lang="ts">
import { computed } from 'vue'
import config from '@config'
import { getBrowserTheme, getPCLocationInfo } from '@maple-design/cli/client'
import { Context, Message } from '@maple-design/ui'
import { DocPreview, type DocPreviewSource } from '@sparknest/ui-doc-preview'
import type { SiteContext } from '../../../types'
import { utoa } from '../../../utils'

const props = defineProps<{
  sourceName: string
  source: string
  highlightCode: string
}>()

const context = Context as SiteContext
const isEnglish = getPCLocationInfo().language === 'en-US'
const sources = computed<DocPreviewSource[]>(() => [
  {
    name: props.sourceName,
    rawCode: decodeURIComponent(props.source),
    highlightCode: decodeURIComponent(props.highlightCode),
  },
])
const playground =
  typeof window !== 'undefined' && window.location.pathname.endsWith('mobile.html')
    ? undefined
    : config?.pc?.header?.playground
const labels = isEnglish
  ? {
      playground: 'Edit in Playground',
      copy: 'Copy source code',
      copied: 'Source copied',
      showSource: 'Show source',
      hideSource: 'Hide source',
      loadError: 'Unable to load source.',
      retry: 'Retry',
    }
  : {
      playground: '在 Playground 中编辑',
      copy: '复制源码',
      copied: '源码已复制',
      showSource: '展开源码',
      hideSource: '收起源码',
      loadError: '源码加载失败。',
      retry: '重试',
    }

function openPlayground(source: string) {
  if (!playground) {
    return
  }
  context.showPlayground = true
  context.playgroundURL = `${playground}/?initialTheme=${getBrowserTheme('demo')}#${utoa(
    JSON.stringify({ 'App.vue': source }),
  )}`
}

function showCopiedMessage() {
  Message.success(config?.pc?.clipboard?.[getPCLocationInfo().language] ?? labels.copied)
}
</script>

<template>
  <DocPreview
    :sources="sources"
    :show-playground="!!playground"
    :labels="labels"
    @copied="showCopiedMessage"
    @playground="openPlayground"
  >
    <slot />
  </DocPreview>
</template>

<style>
.maple-component-preview {
  margin: 24px 0;

  --loca-doc-preview-bg: var(--site-config-color-bar);
  --loca-doc-preview-example-bg: var(--site-config-color-body);
  --loca-doc-preview-source-bg: var(--site-config-color-hl-background);
  --loca-doc-preview-text: var(--site-config-color-text);
  --loca-doc-preview-border: var(--site-config-color-hl-border);
  --loca-doc-preview-brand: var(--site-config-color-text);
}

.maple-component-preview--page .loca-doc-preview__example {
  max-height: min(620px, 70vh);
  overflow: auto;
}
</style>
