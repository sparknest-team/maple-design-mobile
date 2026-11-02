<!-- Source: src/ellipsis/docs/en-US.md; locale: en-US; page: /en-US/ellipsis -->

# Ellipsis

Single-line or multi-line truncation with optional expansion and Tooltip.

## Examples

### Single line

Example source: src/ellipsis/example/demos/en-US/line.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%">
      This is a long description demonstrating text truncation inside a constrained container. Activate the text with a
      pointer or keyboard to expand it, and activate it again to collapse. Text follows the available container width.
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### Multiple lines

Example source: src/ellipsis/example/demos/en-US/multiple-line.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%" :line-clamp="2">
      This is a long description demonstrating text truncation inside a constrained container. Activate the text with a
      pointer or keyboard to expand it, and activate it again to collapse. Text follows the available container width.
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### Interactive expansion

Example source: src/ellipsis/example/demos/en-US/expand.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%" :line-clamp="2" expand-trigger="click" :tooltip="false">
      This is a long description demonstrating text truncation inside a constrained container. Activate the text with a
      pointer or keyboard to expand it, and activate it again to collapse. Text follows the available container width.
    </mp-ellipsis>
    <p>Click the text, or focus it and press Enter / Space.</p>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### Controlled expansion

Example source: src/ellipsis/example/demos/en-US/two-way-binding.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
</script>

<template>
  <div class="ellipsis-demo">
    <mp-button @click="expanded = !expanded">Toggle externally: {{ expanded }}</mp-button>
    <mp-ellipsis
      v-model:expand="expanded"
      style="width: 240px; max-width: 100%"
      :line-clamp="2"
      expand-trigger="click"
      :tooltip="false"
    >
      This is a long description demonstrating text truncation inside a constrained container. Activate the text with a
      pointer or keyboard to expand it, and activate it again to collapse. Text follows the available container width.
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### Custom tooltip

Example source: src/ellipsis/example/demos/en-US/tooltip.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis
      style="width: 240px; max-width: 100%"
      :tooltip="{ status: 'primary', trigger: ['hover', 'focus', 'click'], content: 'Custom tooltip content' }"
    >
      This is a long description demonstrating text truncation inside a constrained container. Activate the text with a
      pointer or keyboard to expand it, and activate it again to collapse. Text follows the available container width.
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `expand` | Controlled expansion | `boolean` | `undefined` |
| `default-expand` | Initial uncontrolled expansion | `boolean` | `false` |
| `expand-trigger` | Enable click / Enter / Space toggling | `'click'` | `—` |
| `line-clamp` | Positive line count; omitted or invalid means single line | `number \| string` | `—` |
| `tooltip` | Tooltip configuration; false disables it | `boolean \| TooltipProps` | `true` |

`expand` never changes locally: the parent must accept `update:expand`. Omit it for internal state initialized by `default-expand`. Tooltip uses its own default width and triggers; it is not conditional on measured overflow. For touch activation, configure `tooltip.trigger` with `click`. CSS width/class/style apply to the text node.

### Events and slots

- `update:expand(expand: boolean)`: requested state after a user action; external updates do not emit.
- `default`: text content.
- `tooltip-content`: custom tooltip; otherwise use `tooltip.content` when supplied, then the text content. Content is never duplicated.
- Keyboard: interactive text supports Enter / Space; tooltip-enabled text supports Tab focus. No public methods.

### Types

```ts
import type { EllipsisProps, EllipsisInstance, EllipsisExpandTrigger } from '@maple-design/ui'
```

### CSS tokens

| Token | Default |
| --- | --- |
| `--mp-ellipsis-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-ellipsis-focus-width` | `2px` |
| `--mp-ellipsis-focus-offset` | `2px` |
