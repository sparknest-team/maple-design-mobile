# Ellipsis

Single-line or multi-line truncation with optional expansion and Tooltip.

## Basic examples

### Single line

```demo
../example/demos/en-US/line.vue
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


```demo
../example/demos/en-US/two-way-binding.vue
```

### Custom tooltip

```demo
../example/demos/en-US/tooltip.vue
```

## Data and options

### Multiple lines

```demo
../example/demos/en-US/multiple-line.vue
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


```demo
../example/demos/en-US/expand.vue
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

Providing `expand` makes the component request updates from its parent rather than changing controlled state. When omitted, internal state is used, initialized once by `default-expand`. Tooltip follows its own width and trigger defaults; display does not depend on measured overflow. Touch callers can include `click` in `tooltip.trigger` explicitly. External class/style/width apply directly to the text node.

### Events and slots

- `update:expand(expand: boolean)`: the new state requested by user interaction; external updates do not emit it.
- `default`: body text.
- `tooltip-content`: tooltip content. Without it, tooltip.content takes precedence, then body text; content is not concatenated twice.
- Keyboard: expandable text supports Enter / Space; tooltip-enabled text is focusable with Tab. No public instance methods.

### Types

```ts
import type { EllipsisProps, EllipsisInstance, EllipsisExpandTrigger } from '@maple-design/ui'
```

### Style variables

| Token | Default |
| --- | --- |
| `--mp-ellipsis-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-ellipsis-focus-width` | `2px` |
| `--mp-ellipsis-focus-offset` | `2px` |
