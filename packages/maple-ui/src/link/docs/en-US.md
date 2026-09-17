# Link

### Intro

Link component for hyperlink to web pages.

### Basic Usage

```demo
../example/demos/en-US/basic.vue
```

### Semantic Status

```demo
../example/demos/en-US/semantic-status.vue
```

### Link Mode

```demo
../example/demos/en-US/mode.vue
```

### Underline

```demo
../example/demos/en-US/underline.vue
```

### Disabled Status

```demo
../example/demos/en-US/disabled-status.vue
```

### Icon

```demo
../example/demos/en-US/icon.vue
```

### Loading

```demo
../example/demos/en-US/loading.vue
```

### Hover Background

Both platforms support hoverable (false by default). It adds padding and hover/active backgrounds without changing underline. Keyboard focus uses :focus-visible independently of hoverable.

The implementation, Props, styles and tests are independently maintained copies. Only prefixes, local icons and theme tokens differ; no runtime core or instances are shared. Disabled/loading links remove href/target/rel, suppress click and leave the Tab order even with an explicit tabindex. Loading takes precedence over dynamic icon slots.

```demo
../example/demos/en-US/hoverable.vue
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
| `--link-default-color` | `#555`                       |
| `--link-primary-color` | `var(--color-primary)`       |
| `--link-danger-color` | `var(--color-danger)`        |
| `--link-success-color` | `var(--color-success)`       |
| `--link-warning-color` | `var(--color-warning)`       |
| `--link-info-color` | `var(--color-info)`          |
| `--link-disabled-color` | `var(--color-text-disabled)` |
| `--link-font-size` | `var(--font-size-md)` |
| `--link-focus-opacity` | `0.8` |

### Copied style contract

Internal classes use `mp-link--status-*`, `mp-link--underline-*` and `mp-link__icon`. Migrate old selectors such as `mp-link--primary`; prefer CSS variables. Existing color/icon/focus variables are retained as aliases for the copied styles.

| Variable | Default |
| --- | --- |
| `--link-bg-hover` | `var(--color-fill-2)` |
| `--link-bg-active` | `var(--color-fill-3)` |
| `--link-padding-horizontal` | `0.25em` |
| `--link-padding-vertical` | `1px` |
| `--link-focus-width` | `2px` |
| `--link-focus-offset` | `2px` |
| `--link-focus-color` | `currentColor` |
| `--link-spin-duration` | `1s` |

```ts
import type { LinkProps, LinkUnderline, LinkInstance } from '@maplejs/maple-ui'
```
