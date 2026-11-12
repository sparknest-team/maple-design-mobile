# Quick start

Start with an existing Vue 3 + Vite project and render a button with explicit imports. See [Import on demand](#/importOnDemand?language=en-US) for automatic imports and other integration options.

## 1. Install

```shell
# npm
npm i @maple-design/ui-vue @maple-design/icons-vue

# pnpm
pnpm add @maple-design/ui-vue @maple-design/icons-vue
```

## 2. Render a component

Import the button and its styles in `App.vue`:

```vue
<script setup lang="ts">
import { Button } from '@maple-design/ui-vue'
import '@maple-design/ui-vue/button/style'
</script>

<template>
  <Button status="primary">Confirm</Button>
</template>
```

The component style entry includes the required foundation styles. Run your project’s development command to see the button.

## Next steps

- [Import on demand](#/importOnDemand?language=en-US): configure automatic imports, manual imports or full registration.
- [Defaults and global configuration](#/defaultsCustomization?language=en-US): configure component defaults, overlay z-index and ripple behavior.
