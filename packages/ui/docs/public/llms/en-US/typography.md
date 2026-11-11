<!-- Source: src/typography/docs/en-US.md; locale: en-US; page: /en-US/typography -->

# Typography

### Intro

Cedar (PC) ships a full typography utility set (alignment, type scale recipes, size, family, weight, line-height; prefix `c-`).  
Maple (Mobile) **does not** duplicate that pack: mobile type is covered by components and `--mp-font-size-*` tokens; use [Atomic CSS](#/en-US/atomic-css) Uno / TW presets when you need atomic classes.

Shared semantic text-color utilities remain in Utilities: `mp-text-1` … `mp-text-4` (`--mp-color-text-*`).

### Related

- [Utilities Overview](#/en-US/utilities)
- [Atomic CSS](#/en-US/atomic-css)
- [Utility Spec](#/en-US/utilitySpec)

## Basic examples

### Basic usage

Example source: src/typography/example/basic.vue

```vue
<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'

onThemeChange()
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="mp-text-1 mp-mb-8">mp-text-1 主文案</div>
    <div class="mp-text-2 mp-mb-8">mp-text-2 次级</div>
    <div class="mp-text-3 mp-mb-8">mp-text-3 辅助</div>
    <div class="mp-text-4">mp-text-4 弱化</div>
    <div class="mp-text-3 mp-mt-24">PC 排版工具类见 Cedar Typography；Mobile 用 token / 原子化 CSS。</div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';
</style>
```
