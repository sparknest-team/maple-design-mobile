<!-- Source: src/link/docs/en-US.md; locale: en-US; page: /en-US/link -->

# Link

## Examples

### Intro

Link component for hyperlink to web pages.

### Basic Usage

Example source: src/link/example/demos/en-US/basic.vue

```vue
<template>
  <mp-link>Default link</mp-link>
</template>
```

### Sizes

Text, icons and loading indicators scale together. The default size is `md`.

Example source: src/link/example/demos/en-US/size.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" size="md">
    <mp-space v-for="size in sizes" :key="size" wrap size="md" align="center">
      <mp-link :size="size" status="primary">{{ size }} Link</mp-link>
      <mp-link :size="size" status="primary" icon>{{ size }} Icon</mp-link>
      <mp-link :size="size" loading>{{ size }} Loading</mp-link>
    </mp-space>
  </mp-space>
</template>
```

### Semantic Status

Example source: src/link/example/demos/en-US/semantic-status.vue

```vue
<template>
  <mp-space wrap size="sm">
    <mp-link>Default link</mp-link>
    <mp-link status="primary">Primary link</mp-link>
    <mp-link status="secondary">Secondary link</mp-link>
    <mp-link status="tertiary">Tertiary link</mp-link>
    <mp-link status="info">Info link</mp-link>
    <mp-link status="success">Success link</mp-link>
    <mp-link status="warning">Warning link</mp-link>
    <mp-link status="danger">Danger link</mp-link>
  </mp-space>
</template>
```

### Link Mode

Example source: src/link/example/demos/en-US/mode.vue

```vue
<template>
  <mp-space size="sm">
    <mp-link status="primary" href="https://example.com/" target="_blank" rel="noopener noreferrer">
      Link with href
    </mp-link>
  </mp-space>
</template>
```

### Underline

Example source: src/link/example/demos/en-US/underline.vue

```vue
<template>
  <mp-space size="sm">
    <mp-link status="primary" underline="always">Always</mp-link>
    <mp-link status="primary" underline="hover">On hover</mp-link>
    <mp-link status="primary" underline="none">None</mp-link>
  </mp-space>
</template>
```

### Disabled Status

Example source: src/link/example/demos/en-US/disabled-status.vue

```vue
<template>
  <mp-link disabled>Disabled</mp-link>
</template>
```

### Icon

Example source: src/link/example/demos/en-US/icon.vue

```vue
<template>
  <mp-space size="sm">
    <mp-link icon>Default icon</mp-link>
    <mp-link>
      <template #icon><m-icon-edit /></template>
      Custom icon
    </mp-link>
  </mp-space>
</template>
```

### Loading

Example source: src/link/example/demos/en-US/loading.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>

<template>
  <mp-space size="sm">
    <mp-link loading>Loading</mp-link>
    <mp-link :loading="loading" @click="handleClick">Click to load</mp-link>
  </mp-space>
</template>
```

### Hover Background

Both platforms support hoverable (false by default). It adds padding and hover/active backgrounds without changing underline. Keyboard focus uses :focus-visible independently of hoverable.

The implementation, Props, styles and tests are independently maintained copies. Only prefixes, local icons and theme tokens differ; no runtime core or instances are shared. Disabled/loading links remove href/target/rel, suppress click and leave the Tab order even with an explicit tabindex. Loading takes precedence over dynamic icon slots.

Example source: src/link/example/demos/en-US/hoverable.vue

```vue
<template>
  <mp-space size="sm">
    <mp-link hoverable href="#link">Hover background</mp-link>
    <mp-link href="#link">Tab key focus</mp-link>
  </mp-space>
</template>
```

## API

### Props

| Prop         | Description                                                                       | Type     | Default  |
|--------------|-----------------------------------------------------------------------------------|----------|----------|
| `status`       | Semantic status: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `underline`  | Underline, Can be set to `always` `hover` `none`                                  | _string_ | `none` |
| `hoverable` | Enable padded hover/active backgrounds | _boolean_ | `false` |
| `disabled`   | Whether to disable link                                                           | _boolean_ | `false`  |
| `loading`    | Loading state; navigation and click are disabled                                  | _boolean_ | `false`  |
| `icon`       | Whether to show the default link icon                                              | _boolean_ | `false`  |
| `href`       | Same as the native `href` attribute                 | _string_ | `-`      |
| `rel`        | Same as the native `rel` attribute                                            | _string_ | `-`      |
| `target`     | Same as the native `target` attribute                                             | _string_ | `-`      |

### Events

| Event        | Description                                                                                   | Arguments      |
| ------------ |-----------------------------------------------------------------------------------------------| -------------- |
| `click`      | Triggered when the link is clicked | `event: MouseEvent` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Link content | `-` |
| `icon` | Custom link icon | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                       | Default                      |
| --- |------------------------------|
| `--mp-link-default-color` | `var(--mp-sys-color-content-primary)`                       |
| `--mp-link-primary-color` | `var(--mp-sys-color-content-brand)`       |
| `--mp-link-danger-color` | `var(--mp-sys-color-content-danger)`        |
| `--mp-link-success-color` | `var(--mp-sys-color-content-success)`       |
| `--mp-link-warning-color` | `var(--mp-sys-color-content-warning)`       |
| `--mp-link-info-color` | `var(--mp-sys-color-content-info)`          |
| `--mp-link-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-link-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-link-focus-opacity` | `0.8` |

### Copied style contract

Internal classes use `mp-link--status-*`, `mp-link--underline-*` and `mp-link__icon`. Migrate old selectors such as `mp-link--primary`; prefer CSS variables. Existing color/icon/focus variables are retained as aliases for the copied styles.

| Variable | Default |
| --- | --- |
| `--mp-link-bg-hover` | `var(--mp-color-fill-2)` |
| `--mp-link-bg-active` | `var(--mp-color-fill-3)` |
| `--mp-link-padding-horizontal` | `0.25em` |
| `--mp-link-padding-vertical` | `1px` |
| `--mp-link-focus-width` | `2px` |
| `--mp-link-focus-offset` | `2px` |
| `--mp-link-focus-color` | `currentColor` |
| `--mp-link-spin-duration` | `1s` |

```ts
import type { LinkProps, LinkUnderline, LinkInstance } from '@maple-design/ui'
```

Text colors follow Button text variants: default uses content-primary, secondary and tertiary use content-secondary, colored statuses use their content roles, and disabled/loading use content-disabled in both brands and modes.

Size tokens：`--mp-link-size-xs-font-size`, `--mp-link-size-sm-font-size`, `--mp-link-size-md-font-size`, `--mp-link-size-lg-font-size`, `--mp-link-size-xl-font-size`。 Defaults: 12 / 13 / 14 / 16 / 18px. The md token follows the existing link-font-size; icons use 1em.
