<!-- Source: src/typography/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/typography -->

# 字体排版 Typography

### 介绍

Cedar（PC）提供完整排版工具类（对齐、字阶组合、字号、字族、字重、行高等，前缀 `c-`）。  
Maple（Mobile）**不复制**该工具包：移动端字阶由组件与 `--mp-font-size-*` 等 token 覆盖；需要原子化时可配合 [原子化 CSS](#/zh-CN/atomic-css) 的 Uno / TW preset。

两端共用的语义色文字层级仍在 Utilities 内：`mp-text-1` … `mp-text-4`（对应 `--mp-color-text-*`）。

### 相关

- [总览 Utilities](#/zh-CN/utilities)
- [原子化 CSS](#/zh-CN/atomic-css)
- [Utility 规范](#/zh-CN/utilitySpec)

## 基础示例

### 基础用法

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
