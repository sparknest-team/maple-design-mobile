# Maple Resolver

[English](./README.md) | 简体中文

`@maple-design/resolver-vue` 是 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 的一个解析器，用于实现 Maple 按需引入。

## 特性

- 支持 `Vite`, `Webpack`, `Vue CLI`, `Rollup`, `esbuild` 等
- 支持自动引入组件对应的 CSS 样式
- 支持 SSR（服务端渲染）

## 自动引入

通过插件
[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 和 
[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
实现组件自动按需导入，这也是我们最推荐的方式。

## 安装插件

```shell
# npm
npm i @maple-design/resolver-vue unplugin-vue-components unplugin-auto-import -D

# yarn
yarn add @maple-design/resolver-vue unplugin-vue-components unplugin-auto-import -D

# pnpm
pnpm add @maple-design/resolver-vue unplugin-vue-components unplugin-auto-import -D
```

### Vite

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { MapleResolver, MapleStyleImports } from '@maple-design/resolver-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    MapleStyleImports(),
    components({
      resolvers: [MapleResolver()]
    }),
    autoImport({
      resolvers: [MapleResolver()]
    })
  ]
})
```

### Vue CLI

```js
// vue.config.js
const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const { MapleResolver } = require('@maple-design/resolver-vue')

module.exports = {
  configureWebpack: {
    plugins: [
      Components.default({
        resolvers: [MapleResolver()]
      }),
      AutoImport.default({
        resolvers: [MapleResolver()]
      })
    ]
  }
}
```

### Typescript 配置注意

为了得到良好的 IDE 语法高亮，请确保上述两个插件生成的类型声明文件被 `typescript` 识别，可在 `tsconfig.json` 中进行如下配置:

```json
{
  "include": ["auto-imports.d.ts", "components.d.ts"]
}
```

### 手动引入

每一个组件都是一个 `Vue插件`，并由 `组件逻辑` 和 `样式文件` 组成，手动引入的使用方式如下。

```js
import App from './App.vue'
import { createApp } from 'vue'
import { Button } from '@maple-design/ui-vue'
import '@maple-design/ui-vue/button/style'

createApp(App).use(Button)
```

或

```html
<script setup>
import { Button as VarButton } from '@maple-design/ui-vue'
import '@maple-design/ui-vue/button/style'
</script>

<template>
  <mp-button>说你好</mp-button>
</template>
```

### 手动引入和自动引入对比

#### 对比-手动引入

```html
<script setup>
import { Button as VarButton, Message } from '@maple-design/ui-vue'
import '@maple-design/ui-vue/button/style'
import '@maple-design/ui-vue/message/style'

function handleClick() {
  Message('你好!')
}
</script>

<template>
  <mp-button @click="handleClick">说你好</mp-button>
</template>
```

#### 对比-自动引入

```html
<script setup>
function handleClick() {
  Message('你好!')
}
</script>

<template>
  <mp-button @click="handleClick">说你好</mp-button>
</template>
```

## 显式 import 自动样式（Vite）

MapleResolver 为模板组件和未声明的函数标识符提供解析；已经手动 import 的函数不会再次触发自动导入。配套 MapleStyleImports() 在 Vue/TypeScript 编译后处理来自 @maple-design/ui-vue 的具名值导入，复用 resolver 的样式映射。支持 Message 别名、普通组件、去重及 importStyle:false；跳过类型、命名空间和默认导入。它是 Vite 插件，不要放进 resolvers 数组。Maple CLI 文档开发已内置该插件，应用项目按上方 Vite 示例配置。更改 CLI 插件配置后需重启开发服务。
