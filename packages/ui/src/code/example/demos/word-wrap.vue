<script setup lang="ts">
import type { Highlighter } from '@maple-design/ui-vue'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import wasmUrl from 'shiki/onig.wasm?url'

let highlighter: ReturnType<typeof createHighlighterCore> | undefined

// Keep the demo bundle limited to its actual languages and themes. Load the
// binary as an asset, rather than embedding its base64 representation in JS.
const codeToHtml: Highlighter['codeToHtml'] = async (code, options) => {
  highlighter ??= createHighlighterCore({
    langs: [import('shiki/langs/javascript.mjs'), import('shiki/langs/python.mjs')],
    themes: [
      import('shiki/themes/vitesse-light.mjs'),
      import('shiki/themes/vitesse-dark.mjs'),
      import('shiki/themes/github-light.mjs'),
      import('shiki/themes/github-dark.mjs'),
    ],
    engine: createOnigurumaEngine(() => fetch(wasmUrl)),
  })
  return (await highlighter).codeToHtml(code, options)
}

const props = defineProps<{ dark?: boolean }>()
</script>

<template>
  <mp-highlighter-provider :highlighter="{ codeToHtml }" :theme="props.dark ? 'vitesse-dark' : 'vitesse-light'">
    <mp-code code="console.log('Hello Maple UI');console.log('Hello Maple UI');" language="javascript" word-wrap />
  </mp-highlighter-provider>
</template>
