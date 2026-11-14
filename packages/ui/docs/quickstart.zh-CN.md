# 快速开始

本页以已有的 Vue 3 + Vite 项目为起点，先通过显式导入运行一个按钮。自动按需引入等完整配置统一放在[按需引入](#/importOnDemand?language=zh-CN)。

## 1. 安装

```shell
# npm
npm i @maple-design/ui-vue @maple-design/icons-vue

# pnpm
pnpm add @maple-design/ui-vue @maple-design/icons-vue
```

## 2. 使用第一个组件

在 `App.vue` 中导入按钮及其样式：

```vue
<script setup lang="ts">
import { Button } from '@maple-design/ui-vue'
import '@maple-design/ui-vue/button/style'
</script>

<template>
  <Button status="primary">确认</Button>
</template>
```

组件样式入口会带入所需的基础样式。启动项目已有的开发命令，即可看到按钮。

## 下一步

- [按需引入](#/importOnDemand?language=zh-CN)：配置推荐的自动导入，或选择手动、完整引入。
- [默认值与全局配置](#/defaultsCustomization?language=zh-CN)：统一组件默认值、浮层起始层级和波纹开关。

### 可选的全局重置

组件样式默认不重置页面元素，也不设置 `body` 字体。需要 normalize.css 时，可在应用入口显式引入：

```ts
import '@maple-design/ui-vue/reset.css'
```

字体、页面背景和全局盒模型由应用自行配置。
