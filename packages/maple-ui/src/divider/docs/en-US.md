# Divider

### Intro

Separate content sections in lists or layouts. The API aligns with Cedar Design Web Divider.

### Basic Usage

```html
<template>
  <mp-divider />
</template>
```

### Type

Set line style with `type`: `solid` `dashed` `dotted` `double`.

```html
<template>
  <mp-divider />
  <mp-divider type="dashed" />
  <mp-divider type="dotted" />
  <mp-divider type="double" :thickness="3" />
</template>
```

### Size & Inset

Control spacing with `size-x` / `size-y`. Supports presets `xs` `sm` `md` `lg` `xl`, numbers, CSS units, or `[start, end]`.

```html
<template>
  <mp-divider size-x="md" />
  <mp-divider :size-x="36" size-y="lg" />
  <mp-divider :size-x="[24, 0]" />
</template>
```

### Vertical

```html
<template>
  <div style="display: flex; align-items: center">
    <span>Text</span>
    <mp-divider orientation="vertical" />
    <span>Text</span>
    <mp-divider orientation="vertical" type="dashed" />
    <span>Text</span>
  </div>
</template>
```

### With Text

Use `description` or the default slot. Control position with `text-align`.

```html
<template>
  <mp-divider description="Description" />
  <mp-divider description="Start" text-align="start" />
  <mp-divider description="End" text-align="end" />
  <mp-divider>
    <m-icon-heart-outline style="margin: 0 16px; color: var(--mp-color-danger)" />
  </mp-divider>
</template>
```

### Color & Thickness

```html
<template>
  <mp-divider color="var(--mp-color-primary)" />
  <mp-divider :thickness="3" color="#6750A4" />
  <mp-divider hairline />
</template>
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
