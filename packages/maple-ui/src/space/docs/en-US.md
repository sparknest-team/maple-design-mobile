# Space

### Intro

The component library provides a layout component,
`<mp-space>`,
so that you can do flex layout more efficiently.

### Basic Use

```demo
../example/demos/en-US/base-use.vue
```

### Vertical

```demo
../example/demos/en-US/vertical.vue
```

### Space Size

```demo
../example/demos/en-US/space.vue
```

### Right Align

```demo
../example/demos/en-US/right-align.vue
```

### Space Around

```demo
../example/demos/en-US/around.vue
```

### Align Center

```demo
../example/demos/en-US/center.vue
```

### Space Between

```demo
../example/demos/en-US/between.vue
```

### xs / sm / md / lg / xl

```demo
../example/demos/en-US/demo-8.vue
```

### Explicit Wrapping

```demo
../example/demos/en-US/wrap.vue
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
