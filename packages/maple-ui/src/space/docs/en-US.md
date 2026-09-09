# Space

### Intro

The component library provides a layout component,
`<mp-space>`,
so that you can do flex layout more efficiently.

### Basic use

```html
<template>
  <mp-space>
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### Vertical

```html
<template>
  <mp-space direction="column" size="lg">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### Space Size

```html
<template>
  <mp-space wrap :size="[20, 20]">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
    <mp-button>Button4</mp-button>
    <mp-button>Button5</mp-button>
    <mp-button>Button6</mp-button>
  </mp-space>
</template>
```

### Right Align

```html
<template>
  <mp-space justify="flex-end">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### Space Around

```html
<template>
  <mp-space justify="space-around">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### Align Center

```html
<template>
  <mp-space justify="center">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### Space Between

```html
<template>
  <mp-space justify="space-between">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

## API

### Props

| Prop        | Description                                                                                             | Type     | Default |
|-------------|---------------------------------------------------------------------------------------------------------|----------|---------|
| `direction` | Layout direction, can be set to `row` `column`                                                          | _string_ | `row`   |
| `justify`   | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | _string_ | `flex-start` |
| `align`     | Cross axis arrangement, Can be set to `stretch` `center` `flex-start` `flex-end` `baseline`. Inferred when omitted (`row` → `center`, `column` → `stretch`) | _string_ | `-`     |
| `size`      | Spacing, can be set to `xs` `sm` `md` `lg` `xl` or `[Vertical, Horizontal]`(Support length unit) | _string \| number \| [string \| number, string \| number]_ |`md`|
| `wrap`      | Whether to exceed the line break                                                                        | _boolean_ | `false`  |
| `block` | Use flex instead of inline-flex | _boolean_ | `true` |

### Slots

| Name      | Description      | SlotProps |
|-----------|------------------|-----------|
| `default` | Content of space | `-`       |

| `split` | Separator between effective children | `-` |

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-space-size-xs-row-gap` | `4px` |
| `--mp-space-size-xs-column-gap` | `4px` |
| `--mp-space-size-sm-row-gap` | `8px` |
| `--mp-space-size-sm-column-gap` | `6px` |
| `--mp-space-size-md-row-gap` | `12px` |
| `--mp-space-size-md-column-gap` | `8px` |
| `--mp-space-size-lg-row-gap` | `16px` |
| `--mp-space-size-lg-column-gap` | `12px` |
| `--mp-space-size-xl-row-gap` | `24px` |
| `--mp-space-size-xl-column-gap` | `16px` |

## Independent source copies

Both libraries independently maintain the rendering, Props, child flattening, styles, spacing tokens and tests. No runtime core or instances are shared. Both default to size=md, wrap=false, block=true and direction=row. Maple users relying on implicit wrapping must explicitly add wrap.

Numbers and numeric strings use px; CSS lengths and expressions are preserved. A tuple always means [rowGap, columnGap], regardless of direction. Tuple entries are lengths, not preset names. All five presets are supported and match Cedar, including built-in Maple themes. Override CSS variables for custom spacing.
