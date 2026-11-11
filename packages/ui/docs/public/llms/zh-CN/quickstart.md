<!-- Source: docs/quickstart.zh-CN.md; locale: zh-CN; page: /zh-CN/quickstart -->

# 快速开始

### 安装

```shell
# npm
npm i @maple-design/ui-vue @maple-design/icons-vue

# pnpm
pnpm add @maple-design/ui-vue @maple-design/icons-vue
```

### 自动按需引入（推荐）

Maple 提供内部维护的 `@maple-design/resolver-vue`。配合 `unplugin-vue-components`，模板中使用到的组件、独立 SVG 图标及其样式会在编译时自动按需引入。

```shell
npm i @maple-design/resolver-vue unplugin-auto-import unplugin-vue-components -D
```

#### Vite

```ts
// vite.config.ts
import { MapleResolver } from '@maple-design/resolver-vue'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [MapleResolver()],
    }),
    Components({
      resolvers: [MapleResolver()],
    }),
  ],
})
```

配置后可直接使用，无需在组件中手动导入：

```html
<template>
  <mp-button status="primary">确认</mp-button>
  <mp-icon size="40" color="red">
    <m-icon-info-circle-fill />
  </mp-icon>
</template>
```

Resolver 会分别生成：

```ts
import { IconInfoCircleFill } from '@maple-design/icons-vue/icon-info-circle-fill'
import { _ButtonComponent, _IconComponent } from '@maple-design/ui-vue'
import '@maple-design/ui-vue/button/style'
import '@maple-design/ui-vue/icon/style'
```

独立 SVG 图标通过 `currentColor` 继承容器颜色，因此图标子包不需要额外 CSS；`mp-icon` 容器自身需要加载 `@maple-design/ui-vue/icon/style`。

#### 动态名称与显式注册

`<mp-icon name="info-circle-fill" />` 只会查询显式注册到 Vue 应用的图标，不会在内部导入图标全集。建议只注册动态场景实际需要的图标：

```ts
// main.ts
import { createApp } from 'vue'
import { IconInfoCircleFill, IconWarning } from '@maple-design/icons-vue'
import App from './App.vue'

const app = createApp(App)
app.component('IconInfoCircleFill', IconInfoCircleFill)
app.component('IconWarning', IconWarning)
app.mount('#app')
```

如果业务确定需要通过任意名称使用全部图标，也可以主动批量注册；这种写法会加载完整图标集合：

```ts
import * as MapleIconsVue from '@maple-design/icons-vue'

for (const [name, component] of Object.entries(MapleIconsVue)) {
  if (name.startsWith('Icon')) app.component(name, component)
}
```

#### 直接使用 SVG 图标

`@maple-design/icons-vue` 中的每个 SVG 图标都是独立的 Vue 组件，也可以不使用 `mp-icon` 容器直接渲染：

```html
<script setup lang="ts">
  import { IconDelete, IconPlus, IconSearch, IconShareFill } from '@maple-design/icons-vue'
</script>

<template>
  <!-- 直接使用 SVG 图标时不会自动提供业务布局属性 -->
  <!-- 请根据使用场景设置宽高、间距等属性 -->
  <IconPlus style="width: 1em; height: 1em; margin-right: 8px" />
  <IconShareFill style="width: 1em; height: 1em; margin-right: 8px" />
  <IconDelete style="width: 1em; height: 1em; margin-right: 8px" />
  <IconSearch style="width: 1em; height: 1em; margin-right: 8px" />
</template>
```

这里的“布局属性”是指 `width`、`height`、`margin` 等业务样式；图标组件自身仍支持 `size`、`color`、`rotate` 和 `spin`。直接使用同样支持 Tree Shaking。需要统一控制布局、尺寸、颜色、动画或交互区域时，推荐再使用 `mp-icon` 包裹。

#### 自动引入函数 API

上面的同一个 `MapleResolver()` 也会为 `unplugin-auto-import` 解析 `Message`、`Dialog`、`ImagePreview` 等函数 API：

```ts
Message.success('保存成功')
```

`importStyle` 会统一控制模板组件、Icon 容器和函数 API 的样式导入。只有明确不希望解析函数 API 时，才需要设置 `MapleResolver({ autoImport: false })`。

#### 自动引入指令

同一个 `MapleResolver()` 也支持 `v-ripple`、`v-lazy`、`v-hover` 和 `v-mp-loading`，无需额外 Resolver。加载指令使用 `mp-` 前缀，避免与其他组件库的同名指令冲突。可通过 `MapleResolver({ directives: false })` 关闭。

### 手动按需引入

不使用自动导入插件时，可手动导入组件和样式：

```html
<script setup lang="ts">
  import { IconInfoCircleFill } from '@maple-design/icons-vue/icon-info-circle-fill'
  import { Button } from '@maple-design/ui-vue'
  import '@maple-design/ui-vue/button/style'
</script>

<template>
  <button status="primary">确认</button>
  <IconInfoCircleFill :size="24" />
</template>
```

### 完整引入

完整引入会注册全部 Maple 组件和指令，并加载全部样式，适合原型或对包体积不敏感的项目：

```ts
import { createApp } from 'vue'
import Maple from '@maple-design/ui-vue'
import '@maple-design/ui-vue/style'
import App from './App.vue'

createApp(App).use(Maple).mount('#app')
```

独立 SVG 图标不会随 UI 包全部注册；请继续显式导入，或使用 `MapleResolver()` 自动按需引入。

### 全局设置组件默认值

每个组件都提供 `setPropsDefaults`，用于统一修改之后创建的声明式组件默认值。请在应用挂载前调用：

```ts
import { Button, ThemeProvider } from '@maple-design/ui-vue'

Button.setPropsDefaults({
  status: 'primary',
  variant: 'tonal',
  size: 'lg',
})

// 其他组件使用相同方式
ThemeProvider.setPropsDefaults({
  tag: 'section',
})
```

组件上显式传入的属性优先级更高。设置不会追溯更新已经挂载的实例；对象和数组默认值会按实例创建副本。

### TypeScript 配置

确保自动生成的声明文件被 TypeScript 包含：

```json
{
  "include": ["src", "components.d.ts", "auto-imports.d.ts"]
}
```

### 样式控制

Resolver 默认自动引入组件样式。如项目已全量引入 `maple.css`，可关闭重复的按需样式：

```ts
MapleResolver({ importStyle: false })
```

## 全局 Context

从 `@maple-design/ui-vue` 命名导入 `Context`，或从 `@maple-design/ui-vue/context` 默认导入同一响应式对象。对象包含 `zIndex`（默认 2000）和 `enableRipple`（默认 true）。调整 `zIndex` 影响之后分配的层级，不改变已经打开的层；关闭波纹只阻止创建新波纹，不禁用宿主交互。

该对象是模块单例，同一模块实例的多个应用和服务端请求共享；不要在 SSR 请求中直接修改它来实现请求隔离。SSR 首次渲染层级使用 2000，挂载后才按当前配置分配；test 环境不递增层级，不同打包副本各自独立。它不是组件，没有 Props、事件、插槽或实例方法。
