<!-- Source: src/code/docs/en-US.md; locale: en-US; page: /en-US/code -->

# Code

### Intro

Code Block component, used for code highlighted

### Notes

- `Code` does not bundle a syntax highlighter. Provide one that implements `codeToHtml` through `HighlighterProvider`.
- Shiki is a recommended integration, not a required dependency. You do not need to install Shiki if your project already has a compatible highlighter.

### Optional: Use Shiki

If you choose [Shiki](https://shiki.tmrs.site/), install it in your application with `pnpm add shiki`, `npm install shiki`, or `yarn add shiki`. See the Shiki documentation for [available themes](https://shiki.tmrs.site/themes) and other configuration options.

The examples below use Shiki only to demonstrate how highlighting is injected into `HighlighterProvider`; `Code` is not coupled to Shiki.

## Basic examples

### Basic Usage

Example source: src/code/example/demos/basic-usage.vue

```vue
<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'
import { codeToHtml } from '../highlighter'

const rootTheme = ref('vitesse-light')
const customTheme = ref('github-light')
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
    <mp-space direction="column" size="lg">
      <mp-code code="console.log('Hello Maple UI')" language="javascript" />
      <mp-code code="print('Hello Maple UI')" language="python" />
      <mp-code code="console.log('Hello Maple UI')" language="javascript" :theme="customTheme" />
    </mp-space>
  </mp-highlighter-provider>
</template>
```

## Layout and arrangement

### Word Wrap

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `code` | Code Snippet | Word Wrap |
| `language` | Code Language | Word Wrap |
| `word-wrap` | Whether to support automatic line wrapping when code overflows | Word Wrap |
<!-- demo-config-notes:end -->


Set `word-wrap` to support automatic line wrapping when code overflows.

Example source: src/code/example/demos/word-wrap.vue

```vue
<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'
import { codeToHtml } from '../highlighter'

const rootTheme = ref('vitesse-light')
onThemeChange((theme) => {
  if (theme.toLocaleLowerCase().includes('dark')) {
    rootTheme.value = 'vitesse-dark'
  } else {
    rootTheme.value = 'vitesse-light'
  }
})
</script>

<template>
  <mp-highlighter-provider :highlighter="{ codeToHtml }" :theme="rootTheme">
    <mp-code code="console.log('Hello Maple UI');console.log('Hello Maple UI');" language="javascript" word-wrap />
  </mp-highlighter-provider>
</template>
```

## Usage notes

### Configuration

Without a highlighter, or if highlighting fails, escaped source remains readable. Only the latest asynchronous result is used. The converter returns HTML that is rendered directly, so its output must be trusted. `word-wrap` controls wrapping on overflow; Code has no component events, slots, or public methods.

## API

### Code Props

| Prop | Description | Type | Default |
| ----------- | -------------------------------- | --------- | ------- |
| `code` | Code Snippet | _string_ | `''` |
| `language` | Code Language | _string_ | `-` |
| `theme` | Code Theme | _string_ | `-` |
| `word-wrap` | Whether to support automatic line wrapping when code overflows | _boolean_ | `false` |
| `trim` | Whether to remove the blank characters at the beginning and end of the code | _boolean_ | `true` |

### HighlighterProvider Props

| Prop | Description | Type | Default |
| ------------- | ------------ | ------------- | ------ |
| `highlighter` | Code Highlighter | `Highlighter` | `-` |
| `theme` | Code Theme | _string_ | `-` |
| `tag` | Custom tag name | _string_ | `div` |

## Types

### Highlighter

| Prop | Description | Type | Default |
| ------------ | ------------------------------------ | --------------------------------------------------------------- | ------ |
| `codeToHtml` | Highlighter function, component highlighter must implement this function | `(code: string, options: CodeToHtmlOptions) => string \| Promise<string>` | `-` |

### CodeToHtmlOptions

| Prop | Description | Type | Default |
| ------- | ---- | -------- | ------ |
| `lang` | Code Language | _string_ | `-` |
| `theme` | Code Theme | _string_ | `-` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-code-font-size` | `14px` | `font-size` |
| `--mp-code-line-height` | `1.7` | `line-height` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-code-font-size: 14px;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
