# Quick Start

### Installation

```shell
npm i @maplejs/maple-ui @maplejs/icons-vue
```

### Automatic On-Demand Imports (Recommended)

Maple maintains `@maplejs/resolver`. With `unplugin-vue-components`, components, standalone SVG icons, and component styles are imported on demand at build time.

```shell
npm i @maplejs/resolver unplugin-auto-import unplugin-vue-components -D
```

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { MapleResolver } from '@maplejs/resolver'
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

Components can then be used without local imports:

```html
<template>
  <mp-button status="primary">Confirm</mp-button>
  <mp-icon size="40" color="red">
    <m-icon-information />
  </mp-icon>
</template>
```

The resolver generates equivalent on-demand imports:

```ts
import { _ButtonComponent, _IconComponent } from '@maplejs/maple-ui'
import { IconInformation } from '@maplejs/icons-vue/icon-information'
import '@maplejs/maple-ui/button/style'
import '@maplejs/maple-ui/icon/style'
```

Standalone SVG icons inherit the wrapper color through `currentColor` and need no additional CSS. The `mp-icon` wrapper itself requires `@maplejs/maple-ui/icon/style`.

#### Use SVG Icons Directly

Every SVG icon from `@maplejs/icons-vue` is an independent Vue component and can be rendered without the `mp-icon` wrapper:

```html
<script setup lang="ts">
import { IconDelete, IconMagnify, IconPlus, IconShare } from '@maplejs/icons-vue'
</script>

<template>
  <!-- Direct SVG icons do not include application layout styles. -->
  <!-- Provide width, height, and spacing for the usage context. -->
  <IconPlus style="width: 1em; height: 1em; margin-right: 8px" />
  <IconShare style="width: 1em; height: 1em; margin-right: 8px" />
  <IconDelete style="width: 1em; height: 1em; margin-right: 8px" />
  <IconMagnify style="width: 1em; height: 1em; margin-right: 8px" />
</template>
```

“Layout styles” means application-level `width`, `height`, and `margin`; icon components still support `size`, `color`, `rotate`, and `spin`. Direct usage is also tree-shakable. Use the `mp-icon` wrapper when size, color, animation, layout, or the interaction area should be controlled consistently.

#### Programmatic APIs

The same `MapleResolver()` shown above resolves APIs such as `Message`, `Dialog`, and `ImagePreview` for `unplugin-auto-import`.

`importStyle` controls style imports for template components, the Icon wrapper, and programmatic APIs consistently. Set `MapleResolver({ autoImport: false })` only when programmatic API resolution should be disabled.

The same `MapleResolver()` also resolves `v-ripple`, `v-lazy`, and `v-hover`. Set `directives: false` to disable directive resolution.

### Manual On-Demand Imports

```html
<script setup lang="ts">
import { Button } from '@maplejs/maple-ui'
import { IconInformation } from '@maplejs/icons-vue/icon-information'
import '@maplejs/maple-ui/button/style'
</script>

<template>
  <Button status="primary">Confirm</Button>
  <IconInformation :size="24" />
</template>
```

### Full Import

```ts
import { createApp } from 'vue'
import Maple from '@maplejs/maple-ui'
import '@maplejs/maple-ui/style'
import App from './App.vue'

createApp(App).use(Maple).mount('#app')
```

Standalone SVG icons are not globally registered by the UI package. Import them explicitly or use `MapleResolver()`.

### TypeScript

```json
{
  "include": ["src", "components.d.ts", "auto-imports.d.ts"]
}
```

The resolver imports component styles by default. Disable this when the full stylesheet is already loaded:

```ts
MapleResolver({ importStyle: false })
```
