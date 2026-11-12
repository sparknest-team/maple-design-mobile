<!-- Source: src/ellipsis/docs/en-US.md; locale: en-US; page: /en-US/ellipsis -->

# Ellipsis

Single-line or multi-line truncation with optional expansion and Tooltip.

## Basic examples

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

## Content and presentation

### Controlled expansion

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `tooltip` | Tooltip configuration; false disables it | Controlled expansion, Custom tooltip |
| `expand` | Controlled expansion | Controlled expansion |
| `line-clamp` | Positive line count; omitted or invalid means single line | Controlled expansion |
| `expand-trigger` | Enable click / Enter / Space toggling | Controlled expansion |
<!-- demo-config-notes:end -->


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

## Data and options

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

## Interaction and control

### Interactive expansion

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `line-clamp` | Positive line count; omitted or invalid means single line | Interactive expansion |
| `expand-trigger` | Enable click / Enter / Space toggling | Interactive expansion |
| `tooltip` | Tooltip configuration; false disables it | Interactive expansion |
<!-- demo-config-notes:end -->


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

## Usage notes

### Rows and content boundaries

expand-trigger supports only click. Invalid values produce Vue prop validation warnings in development and do not enable button semantics, click or keyboard expansion. line-clamp accepts finite numbers or numeric strings of at least one row and floors decimals. Values below one, nonfinite values and invalid strings warn and fall back to ordinary single-line mode, clearing old multiline styles. Prefer plain text or inline content without independent interactions. The default Tooltip still does not detect actual overflow and remains focusable with Tab when enabled. Custom tooltip content and controlled expansion remain unchanged.

## API

### Ellipsis Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `expand` | Controlled expansion | `boolean` | `undefined` |
| `default-expand` | Initial uncontrolled expansion | `boolean` | `false` |
| `expand-trigger` | Enable click / Enter / Space toggling | `'click'` | `—` |
| `line-clamp` | Positive line count; omitted or invalid means single line | `number \| string` | `—` |
| `tooltip` | Tooltip configuration; false disables it | `boolean \| TooltipProps` | `true` |

Providing `expand` makes the component request updates from its parent rather than changing controlled state. When omitted, internal state is used, initialized once by `default-expand`. Tooltip follows its own width and trigger defaults; display does not depend on measured overflow. Touch callers can include `click` in `tooltip.trigger` explicitly. External class/style/width apply directly to the text node.

### Ellipsis Events / Slots

- `update:expand(expand: boolean)`: the new state requested by user interaction; external updates do not emit it.
- `default`: body text.
- `tooltip-content`: tooltip content. Without it, tooltip.content takes precedence, then body text; content is not concatenated twice.
- Keyboard: expandable text supports Enter / Space; tooltip-enabled text is focusable with Tab. No public instance methods.

## Types

```ts
import type { EllipsisProps, EllipsisInstance, EllipsisExpandTrigger } from '@maple-design/ui-vue'
```

### Imports and event types

The subentry default component and the named components from the subentry and root are the same component. Props includes actual listener parameters. Events remain notifications and do not await returned Promises. Use only the documented instance methods.

```ts
import Ellipsis, { Ellipsis as NamedEllipsis } from '@maple-design/ui-vue/ellipsis'
import { Ellipsis as RootEllipsis } from '@maple-design/ui-vue'
import type { EllipsisProps, EllipsisInstance } from '@maple-design/ui-vue'
import type { EllipsisProps as SubEllipsisProps } from '@maple-design/ui-vue/ellipsis'
const options: EllipsisProps = { 'onUpdate:expand': (expanded: boolean) => String(expanded) }
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-ellipsis-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-ellipsis-focus-offset` | `2px` | `outline-offset` |
| `--mp-ellipsis-focus-width` | `2px` | `outline` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-ellipsis-focus-color: var(--mp-sys-color-action-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
