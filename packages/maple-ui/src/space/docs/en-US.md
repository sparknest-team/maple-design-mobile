# Space

### Intro

The component library provides two auxiliary layout components,
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
  <mp-space direction="column" size="large">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### Space Size

```html
<template>
  <mp-space :size="[20, 20]">
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
| `justify`   | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between`             | _string_ | `flex-start` |
| `align`     | Cross axis arrangement, Can be set to `stretch` `center` `flex-start` `flex-end` `baseline`. Inferred when omitted (`row` → `center`, `column` → `stretch`) | _string_ | `-`     |
| `size`      | Spacing, can be set to `mini` `small` `normal` `large` or `[Vertical, Horizontal]`(Support length unit) | _string \| number \| [string \| number, string \| number]_ |`normal`|
| `wrap`      | Whether to exceed the line break                                                                        | _boolean_ | `true`  |
| `inline`    | Is it an inline element                                                                                 | _boolean_ | `false` |

### Slots

| Name      | Description      | SlotProps |
|-----------|------------------|-----------|
| `default` | Content of space | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--space-size-mini-y`  | `4px`        |
| `--space-size-mini-x`  | `4px`        |
| `--space-size-small-y` | `6px`        |
| `--space-size-small-x` | `6px`        |
| `--space-size-normal-y` | `8px`        |
| `--space-size-normal-x` | `12px`       |
| `--space-size-large-y` | `12px`       |
| `--space-size-large-x` | `20px`       |