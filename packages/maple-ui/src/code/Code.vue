<template>
  <div dir="ltr" :class="classes(n(), [wordWrap, n('--word-wrap')])" v-html="highlightedCode"></div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { injectHighlighterProvider } from '../highlighter-provider/provide'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('code')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { highlighter, theme } = injectHighlighterProvider()
    const highlightedCode = ref('')
    const normalizedTheme = computed(() => props.theme ?? theme?.value)

    watch(
      () => [highlighter?.value, props.code, props.language, normalizedTheme.value, props.trim] as const,
      async ([highlighter, code, lang = '', theme = '', trim], _previous, onCleanup) => {
        let current = true
        onCleanup(() => {
          current = false
        })
        const content = trim ? code.trim() : code
        // Removing a provider must not leave stale highlighted HTML behind.
        const plain = `<pre><code>${content.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</code></pre>`
        highlightedCode.value = plain
        if (!highlighter) {
          return
        }
        try {
          const html = await highlighter.codeToHtml(content, { lang, theme })
          if (current) {
            highlightedCode.value = html
          }
        } catch {
          // Keep readable, escaped source when an optional highlighter fails.
        }
      },
      { immediate: true },
    )

    return {
      n,
      classes,
      highlightedCode,
    }
  },
})
</script>
