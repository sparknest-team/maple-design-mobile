# Divider

## Intro

Separate content sections in lists or layouts. The API aligns with Cedar Design Web Divider.

## Examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Type

Set line style with `type`: `solid` `dashed` `dotted` `double`.

```demo
../example/demos/type.vue
```

### Size & Inset

Control spacing with `size-x` / `size-y`. Supports presets `xs` `sm` `md` `lg` `xl`, numbers, CSS units, or `[start, end]`.

```demo
../example/demos/size.vue
```

### Vertical

```demo
../example/demos/vertical.vue
```

### With Text

Use `description` or the default slot. Control position with `text-align`.

```demo
../example/demos/with-desc.vue
```

### Custom Content

```demo
../example/demos/custom.vue
```

### Color, Thickness & Opacity

```demo
../example/demos/color.vue
```
## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `orientation` | Direction: `horizontal` `vertical` | _string_ | `horizontal` |
| `type` | Line style: `solid` `dashed` `dotted` `double` | _string_ | `solid` |
| `text-align` | Text align: `start` `center` `end` | _string_ | `center` |
| `description` | Description text | _string_ | `-` |
| `size-x` | Horizontal inset / vertical block spacing | _number \| string \| array_ | `-` |
| `size-y` | Horizontal block spacing / vertical inline spacing | _number \| string \| array_ | `md` |
| `thickness` | Line width (mutually exclusive with `hairline`) | _number_ | `-` |
| `hairline` | Whether to use a 0.5px line | _boolean_ | `false` |
| `color` | Divider color | _string_ | `-` |
| `opacity` | Opacity | _number_ | `-` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content in the middle |

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-divider-color` | `var(--mp-color-border-2)` |
| `--mp-divider-text-color` | `#888` |
| `--mp-divider-border-width` | `1px` |
| `--mp-divider-text-padding` | `8px` |
| `--mp-divider-text-align-inset` | `24px` |
| `--mp-divider-orientation-*-size-*-{xs\|sm\|md\|lg\|xl}` | Preset size tokens |
