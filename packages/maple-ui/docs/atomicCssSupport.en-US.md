# Atomic CSS support

### Intro

We've provided common CSS atomization framework presets, made it easier to access the component library's underlying style variables, and standardized page responsiveness breakpoints.

### UnoCSS

#### Install

```shell
# playground-ignore
# npm
npm i @nio-pow/maple-preset-unocss -D
# yarn
yarn add @nio-pow/maple-preset-unocss -D
# pnpm
pnpm add @nio-pow/maple-preset-unocss -D
```

#### Configuration

```js
// playground-ignore
// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import { presetMaple } from '@nio-pow/maple-preset-unocss'

export default defineConfig({
  presets: [presetUno(), presetMaple()]
})
```

#### More Options

Presets detailed definition [please watch here](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-unocss/src/index.ts).

### Tailwindcss

#### Install

```shell
# playground-ignore
# npm
npm i @nio-pow/maple-preset-tailwindcss -D
# yarn
yarn add @nio-pow/maple-preset-tailwindcss -D
# pnpm
pnpm add @nio-pow/maple-preset-tailwindcss -D
```

#### Tailwindcss V3 Configuration

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@nio-pow/maple-preset-tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  presets: [presetMaple()]
}
```

#### Tailwindcss V4 Configuration

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@nio-pow/maple-preset-tailwindcss'

export default {
  presets: [presetMaple()]
}
```

```css
/** src/style.css */
@import "tailwindcss";
@config "../tailwind.config.js";
```

### More Options

Presets detailed definition [please watch here](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-tailwindcss/src/index.ts).

### Usage

```html
<!-- playground-ignore -->
<template>
  <div class="text-on-primary bg-primary text-md">hello</div>
  <div class="text-on-primary-container bg-primary-container text-lg">world</div>
  <div class="bg-primary sm:bg-info md:bg-warning lg:bg-danger xl:bg-success">varlet</div>
</template>
```

We also support the HSL variables, which makes the transparency of adjusting the color easier.

```html
<!-- playground-ignore -->
<template>
  <div class="bg-hsl-primary/50 text-hsl-text/70">hello</div>
</template>
```