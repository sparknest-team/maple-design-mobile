<!-- Source: src/highlighter-provider/docs/en-US.md; locale: en-US; page: /en-US/highlighter-provider -->

# HighlighterProvider

Provide a shared syntax highlighter configuration to code displays.

## Basic examples

### Basic usage

Example source: src/highlighter-provider/example/demos/basic.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const custom = ref(false)
const highlighter = computed(() => {
  const prefix = custom.value ? 'Custom: ' : ''
  return {
    async codeToHtml(code: string) {
      const escaped = code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      return '<pre><code>' + prefix + escaped + '</code></pre>'
    },
  }
})
</script>

<template>
  <mp-checkbox v-model="custom">自定义着色器 / Custom highlighter</mp-checkbox>
  <mp-highlighter-provider :highlighter="highlighter" theme="local">
    <mp-code code="const message = 'Hello Maple'" language="typescript" />
  </mp-highlighter-provider>
</template>
```

## API

### HighlighterProvider Props

| Prop | Description | Type | Default |
| ------------------ | -------------------------------------------------------------- | ---------------- | ------------------ |
| `highlighter` | Code Highlighter | `Highlighter` | `-` |
| `theme` | Code Theme | _string_ | `-` |
| `tag` | Custom tag name | _string_ | `div` |

### HighlighterProvider Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Component content | `-` |

Import the `Highlighter` and `CodeToHtmlOptions` types from the package root or `highlighter-provider` entry. `codeToHtml` can return an HTML string synchronously or a Promise. The nearest nested provider replaces the outer configuration as a whole; an unset `highlighter` is not inherited. `tag` is the rendered native container element. The creator owns external highlighters and their resources; the provider does not dispose them.
## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
