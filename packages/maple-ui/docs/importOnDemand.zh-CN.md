# 按需引入

### 介绍

按需引入避免了组件的全量导入，可以有效的减少发布包的大小。

### 自动引入

通过插件
[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 和 
[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
实现组件自动按需导入，这也是我们最推荐的方式。

#### 安装插件

```shell
# playground-ignore
# npm
npm i @maple-design/resolver unplugin-vue-components unplugin-auto-import -D

# yarn
yarn add @maple-design/resolver unplugin-vue-components unplugin-auto-import -D

# pnpm
pnpm add @maple-design/resolver unplugin-vue-components unplugin-auto-import -D
```

独立 SVG 图标由 `@maple-design/icons-vue` 提供，请将其安装为项目依赖：

```shell
pnpm add @maple-design/icons-vue
```

#### Vite

```js
// playground-ignore
// vite.config.js
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { MapleResolver } from '@maple-design/resolver'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [MapleResolver()]
    }),
    autoImport({
      resolvers: [MapleResolver()]
    })
  ]
})
```

同一个 Resolver 会根据组件名自动选择 UI 包或图标包，无需配置第二个 Resolver：

```vue
<template>
  <mp-button>确认</mp-button>
  <mp-icon-info-circle-fill :size="32" />
</template>
```

`MpButton` 从 `@maple-design/ui` 引入，`MpIconInfoCircleFill` 从 `@maple-design/icons-vue` 引入；`MpIcon` 本身仍是支持动态名称和切换动画的包装组件。

#### Vue CLI
```js
// playground-ignore
// vue.config.js
const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const { MapleResolver } = require('@maple-design/resolver')

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

#### Typescript 配置注意

为了得到良好的 IDE 语法高亮，请确保上述两个插件生成的类型声明文件被 `typescript` 识别，可在 `tsconfig.json` 中进行如下配置:

```json
// playground-ignore
{
  "include": ["auto-imports.d.ts", "components.d.ts"]
}
```

### 手动引入

每一个组件都是一个 `Vue插件`，并由 `组件逻辑` 和 `样式文件` 组成，手动引入的使用方式如下。

```js
// playground-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { Button } from '@maple-design/ui'
import '@maple-design/ui/button/style'

createApp(App).use(Button)
```

或

```html
// playground-ignore
<script setup>
import { Button as VarButton } from '@maple-design/ui'
import '@maple-design/ui/button/style'
</script>

<template>
  <mp-button>说你好</mp-button>
</template>
```

### 手动引入和自动引入对比

#### 手动引入

```html
// playground-ignore
<script setup>
import { Button as VarButton, Message } from '@maple-design/ui'
import '@maple-design/ui/button/style'
import '@maple-design/ui/message/style'

function handleClick() {
  Message('你好!')
}
</script>

<template>
  <mp-button @click="handleClick">说你好</mp-button>
</template>
```

#### 自动引入

```html
// playground-ignore
<script setup>
function handleClick() {
  Message('你好!')
}
</script>

<template>
  <mp-button @click="handleClick">说你好</mp-button>
</template>
```
