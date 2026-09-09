# Paper

### Intro

An easier container using elevation and water effects.

### Basic Usage

```html
<template>
   <mp-paper :elevation="2" :width="100" :height="100" />
</template>
```

### Ripple Effect

```html
<template>
   <mp-paper :elevation="2" :width="100" :height="100" ripple />
</template>
```

### Rounded Paper

```html
<template>
   <mp-paper :elevation="2" :width="100" :height="100" round />
</template>
```

### Custom Border Radius

```html
<template>
   <mp-paper :elevation="2" :width="100" :height="100" :radius="8" />
</template>
```

### Use Slot

```html
<template>
   <mp-paper :elevation="2">
     <mp-cell>Paper</mp-cell>
     <mp-cell>Paper</mp-cell>
     <mp-cell>Paper</mp-cell>
   </mp-paper>
</template>
```

### Border

```html
<mp-paper bordered>Border</mp-paper>
<mp-paper bordered :elevation="2" style="padding: 16px">Border and shadow</mp-paper>
```

Paper is a low-level surface, not a structured Card. It has no variant/status and no default padding. Borders and elevation are independent. Use it for custom panels, form sections or the surface inside a popup; positioning, focus and button semantics remain outside Paper.

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `bordered` | Show a border independently of elevation | _boolean_ | `false` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `false`    |
| `ripple` | Whether to enable ripple effect | _boolean_ | `false` |
| `radius` | Paper border radius | _string \| number_ | `-` |
| `width` | Paper width | _string \| number_ | `-` |
| `height` | Paper height | _string \| number_ | `-` |
| `round` | Whether to enable round paper | _boolean_ | `false` |
| `inline` | Whether to use inline paper | _boolean_ | `false` |

### Events

| Event | Description | Arguments |
| ------- | -------------- | -------------- |
| `click` | Triggered when the paper is clicked | `event: MouseEvent` |

### Slots

| Name | Description | SlotProps |
| --- | ----| ---- |
| `default` | Paper content | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ------ | -------------|
| `--paper-background`    | `var(--color-bg-2)` |
| `--paper-border-radius` | `4px` |
| `--paper-border-width` | `1px` |
| `--paper-border-color` | `var(--color-border)` |
| `--paper-transition-duration` | `0.25s` |

Numeric dimensions/radius (including numeric strings) use px; CSS lengths are preserved. Explicit radius overrides round. Themes may override background/radius.

Both libraries maintain independent copies of the implementation, Props, styles, tokens and tests; no shared runtime core or instances. Maple migration: default background uses the theme surface; pointer cursor is opt-in with ripple; inline now uses mp-paper--inline. Existing APIs remain supported.
