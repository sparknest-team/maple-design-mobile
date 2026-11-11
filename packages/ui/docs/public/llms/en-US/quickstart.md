<!-- Source: docs/quickstart.en-US.md; locale: en-US; page: /en-US/quickstart -->

# Quick Start

### Installation

```shell
npm i @maple-design/ui-vue @maple-design/icons-vue
```

### Automatic On-Demand Imports (Recommended)

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

#### Use SVG Icons Directly

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

#### Programmatic APIs

The same `MapleResolver()` shown above resolves APIs such as `Message`, `Dialog`, and `ImagePreview` for `unplugin-auto-import`.

`importStyle` controls style imports for template components, the Icon wrapper, and programmatic APIs consistently. Set `MapleResolver({ autoImport: false })` only when programmatic API resolution should be disabled.

The same `MapleResolver()` also resolves `v-ripple`, `v-lazy`, `v-hover`, and `v-mp-loading`. The loading directive uses the `mp-` prefix to avoid collisions with directives from other component libraries. Set `directives: false` to disable directive resolution.

### Manual On-Demand Imports

```html
<script setup lang="ts">
  import { IconInfoCircleFill } from '@maple-design/icons-vue/icon-info-circle-fill'
  import { Button } from '@maple-design/ui-vue'
  import '@maple-design/ui-vue/button/style'
</script>

<template>
  <button status="primary">Confirm</button>
  <IconInfoCircleFill :size="24" />
</template>
```

### Full Import

```ts
import { createApp } from 'vue'
import Maple from '@maple-design/ui-vue'
import '@maple-design/ui-vue/style'
import App from './App.vue'

createApp(App).use(Maple).mount('#app')
```

Standalone SVG icons are not globally registered by the UI package. Import them explicitly or use `MapleResolver()`.

### Set Global Component Defaults

Every component provides `setPropsDefaults` for changing the defaults of declarative instances created afterward. Call it before mounting the application:

```ts
import { Button, ThemeProvider } from '@maple-design/ui-vue'

Button.setPropsDefaults({
  status: 'primary',
  variant: 'tonal',
  size: 'lg',
})

// Other components use the same API
ThemeProvider.setPropsDefaults({
  tag: 'section',
})
```

Explicit component props take precedence. Existing mounted instances are not updated; object and array defaults are copied per instance.

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

## Global Context

Import `Context` from `@maple-design/ui-vue`, or default-import the same reactive object from `@maple-design/ui-vue/context`. It has `zIndex` (default 2000) and `enableRipple` (default true). Changing `zIndex` affects later allocations, not already open layers. Disabling ripple prevents new waves without disabling host interactions.

This is a module singleton shared by applications and server requests using the same module instance; do not mutate it for per-request SSR isolation. SSR starts at 2000 and allocates from the current value after mounting. The test environment does not increment allocations, and separate bundled copies have separate state. It is not a component and has no props, events, slots, or instance methods.
