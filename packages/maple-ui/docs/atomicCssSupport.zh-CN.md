# 原子化 CSS 支持

### 介绍

我们提供了常见的 CSS 原子化框架预设，使访问组件库的基础样式变量更加容易，并且一致化了页面响应式断点。

### UnoCSS

#### 安装

```shell
# playground-ignore
# npm
npm i @maplejs/maple-preset-unocss -D
# yarn
yarn add @maplejs/maple-preset-unocss -D
# pnpm
pnpm add @maplejs/maple-preset-unocss -D
```

#### 配置

```js
// playground-ignore
// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import { presetMaple } from '@maplejs/maple-preset-unocss'

export default defineConfig({
  presets: [presetUno(), presetMaple()]
})
```

#### 更多配置

预设的详细定义[请看这里](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-unocss/src/index.ts)。

### Tailwindcss

#### 安装

```shell
# playground-ignore
# npm
npm i @maplejs/maple-preset-tailwindcss -D
# yarn
yarn add @maplejs/maple-preset-tailwindcss -D
# pnpm
pnpm add @maplejs/maple-preset-tailwindcss -D
```

#### Tailwindcss V3 配置

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@maplejs/maple-preset-tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  presets: [presetMaple()]
}
```

#### Tailwindcss V4 配置

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@maplejs/maple-preset-tailwindcss'

export default {
  presets: [presetMaple()]
}
```

```css
/** src/style.css */
@import "tailwindcss";
@config "../tailwind.config.js";
```

#### 更多配置

预设的详细定义[请看这里](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-tailwindcss/src/index.ts)。

### 使用方式

```html
<!-- playground-ignore -->
<template>
  <div class="text-on-primary bg-primary text-md">hello</div>
  <div class="text-on-primary-container bg-primary-container text-lg">world</div>
  <div class="bg-primary sm:bg-info md:bg-warning lg:bg-danger xl:bg-success">varlet</div>
</template>
```

我们同时也支持了 hsl 变量，这使得调整颜色的透明度变得更加容易。

```html
<!-- playground-ignore -->
<template>
  <div class="bg-hsl-primary/50 text-hsl-text/70">hello</div>
</template>
```

