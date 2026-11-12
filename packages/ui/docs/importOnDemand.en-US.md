# Import on demand

This page covers automatic, manual and full imports, plus icons, directives, function APIs, types and styles. Start with [Quick start](#/quickstart?language=en-US) if you have not installed the library.

## Automatic On-Demand Imports (Recommended)

Maple maintains `@maple-design/resolver-vue`. With `unplugin-vue-components`, components, standalone SVG icons, and component styles are imported on demand at build time.

```shell
npm i @maple-design/resolver-vue unplugin-auto-import unplugin-vue-components -D
```

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

Components can then be used without local imports:

```html
<template>
  <mp-button status="primary">Confirm</mp-button>
  <mp-icon size="40" color="red">
    <m-icon-info-circle-fill />
  </mp-icon>
</template>
```

The resolver generates equivalent on-demand imports:

```ts
import { IconInfoCircleFill } from '@maple-design/icons-vue/icon-info-circle-fill'
import { _ButtonComponent, _IconComponent } from '@maple-design/ui-vue'
import '@maple-design/ui-vue/button/style'
import '@maple-design/ui-vue/icon/style'
```

Standalone SVG icons inherit the wrapper color through `currentColor` and need no additional CSS. The `mp-icon` wrapper itself requires `@maple-design/ui-vue/icon/style`.

### Dynamic icon names

`<mp-icon name="info-circle-fill" />` only looks up icons explicitly registered on the Vue application. Register the icons needed for dynamic names before mounting:

```ts
import { createApp } from 'vue'
import { IconInfoCircleFill, IconWarning } from '@maple-design/icons-vue'
import App from './App.vue'

const app = createApp(App)
app.component('IconInfoCircleFill', IconInfoCircleFill)
app.component('IconWarning', IconWarning)
app.mount('#app')
```

Registering the entire icon collection with a namespace import loads all icons. Prefer explicit registration or static icon components for on-demand loading.

### Use SVG Icons Directly

Every SVG icon from `@maple-design/icons-vue` is an independent Vue component and can be rendered without the `mp-icon` wrapper:

```html
<script setup lang="ts">
  import { IconDelete, IconPlus, IconSearch, IconShareFill } from '@maple-design/icons-vue'
</script>

<template>
  <!-- Direct SVG icons do not include application layout styles. -->
  <!-- Provide width, height, and spacing for the usage context. -->
  <IconPlus style="width: 1em; height: 1em; margin-right: 8px" />
  <IconShareFill style="width: 1em; height: 1em; margin-right: 8px" />
  <IconDelete style="width: 1em; height: 1em; margin-right: 8px" />
  <IconSearch style="width: 1em; height: 1em; margin-right: 8px" />
</template>
```

“Layout styles” means application-level `width`, `height`, and `margin`; icon components still support `size`, `color`, `rotate`, and `spin`. Direct usage is also tree-shakable. Use the `mp-icon` wrapper when size, color, animation, layout, or the interaction area should be controlled consistently.

### Programmatic APIs

The same `MapleResolver()` shown above resolves APIs such as `Message`, `Dialog`, and `ImagePreview` for `unplugin-auto-import`.

`importStyle` controls style imports for template components, the Icon wrapper, and programmatic APIs consistently. Set `MapleResolver({ autoImport: false })` only when programmatic API resolution should be disabled.

### Directives

The same `MapleResolver()` also resolves `v-ripple`, `v-lazy`, `v-hover`, and `v-mp-loading`. The loading directive uses the `mp-` prefix to avoid collisions with directives from other component libraries. Set `directives: false` to disable directive resolution.

### Vue CLI
```js
// playground-ignore
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

## Manual On-Demand Imports

```html
<script setup lang="ts">
  import { IconInfoCircleFill } from '@maple-design/icons-vue/icon-info-circle-fill'
  import { Button } from '@maple-design/ui-vue'
  import '@maple-design/ui-vue/button/style'
</script>

<template>
  <Button status="primary">Confirm</Button>
  <IconInfoCircleFill :size="24" />
</template>
```

## Full Import

```ts
import { createApp } from 'vue'
import Maple from '@maple-design/ui-vue'
import '@maple-design/ui-vue/style'
import App from './App.vue'

createApp(App).use(Maple).mount('#app')
```

Standalone SVG icons are not globally registered by the UI package. Import them explicitly or use `MapleResolver()`.

## TypeScript

```json
{
  "include": ["src", "components.d.ts", "auto-imports.d.ts"]
}
```

Keep the existing entries in your TypeScript `include`; the plugins generate these declaration files from actual usage.

## Style imports

The resolver imports component styles by default. Disable this when the full stylesheet is already loaded:

```ts
MapleResolver({ importStyle: false })
```
