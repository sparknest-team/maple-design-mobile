# Link

### Intro

Link component for hyperlink to web pages.

## Basic examples

### Basic Usage

```demo
../example/demos/en-US/basic.vue
```

## Appearance and states

### Link sizes and semantic colors

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Semantic status: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Link sizes and semantic colors, Link Mode, Underline |
| `href` | Same as the native `href` attribute | Link Mode, Hover Background |
| `icon` | Whether to show the default link icon | Link sizes and semantic colors |
| `loading` | Loading state; navigation and click are disabled | Link sizes and semantic colors |
| `target` | Same as the native `target` attribute | Link Mode |
| `rel` | Same as the native `rel` attribute | Link Mode |
<!-- demo-config-notes:end -->


Compare sizes and semantic colors independently of navigation, disabled interception and loading.

<details>
<summary>Configuration details and limits</summary>

#### Sizes

Text, icons and loading indicators scale together. The default size is `md`.

</details>

```demo
../example/demos/en-US/appearance-comparison.vue
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

### Hover Background

Both platforms support hoverable (false by default). It adds padding and hover/active backgrounds without changing underline. Keyboard focus uses :focus-visible independently of hoverable.

The implementation, Props, styles and tests are independently maintained copies. Only prefixes, local icons and theme tokens differ; no runtime core or instances are shared. Disabled/loading links remove href/target/rel, suppress click and leave the Tab order even with an explicit tabindex. Loading takes precedence over dynamic icon slots.

```demo
../example/demos/en-US/hoverable.vue
```

## Content and presentation

### Icon

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `icon` | Whether to show the default link icon | Icon |
| `status` | Semantic status: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Firefly palette |
<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/icon.vue
```

### Firefly palette

Primary, secondary and tertiary links use the same foreground roles as Button text/outline variants. The example uses a navy surface for bright primary/violet text and a light surface for light-mode secondary text, matching the Button examples.

```demo
../example/demos/en-US/theme-colors.vue
```

## Interaction and control

### Loading

```demo
../example/demos/en-US/loading.vue
```

## API

### Native links and controlled loading

Provide href for navigation. Disabled/loading links retain their link role when an href was provided, remove navigation attributes and leave the Tab order. Native download, hreflang, referrerpolicy and ARIA attributes pass through. Loading replaces the icon slot. click is a MouseEvent notification with Vue once semantics; returned promises do not manage loading. Use Button for operations without a navigation target.

The loading example prepares a report on the first activation, then uses the browser's native download on the next activation. Preparation is canceled when unmounted.


### Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `size` | Five text, icon and spinner sizes | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' |
| `href` | Native link destination | string | - |
| `target` | Native target | string | - |
| `rel` | Native rel | string | - |
| `status` | Semantic status | SemanticStatus | 'default' |
| `underline` | Underline policy | 'always' \| 'hover' \| 'none' | 'none' |
| `hoverable` | Padded hover/active backgrounds | boolean | false |
| `icon` | Show the leading icon; icon slot takes priority | boolean | false |
| `loading` | Show spinner and block navigation/click | boolean | false |
| `disabled` | Disable the link | boolean | false |


### Events

| Event | Description | Arguments |
| --- | ------------------------------------------------- | --- |
| `click` | Triggered when the link is clicked | `event: MouseEvent` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Link content | `-` |
| `icon` | Custom link icon | `-` |

### Type definitions

```ts
import type { LinkProps, LinkSize, LinkUnderline, LinkInstance } from '@maple-design/ui'
```

### Style variables
The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | ------------------------------ |
| `--mp-link-default-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-link-primary-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-link-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-link-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-link-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-link-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-link-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-link-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-link-icon-size` | `1em` |
| `--mp-link-focus-opacity` | `0.8` |

### Shared-source style rules

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


Text colors match Button text variants: default uses content-primary; secondary/tertiary use content-secondary; colored statuses use their semantic content colors; disabled/loading use content-disabled. Both brands inherit these in light/dark modes.

Size variables: `--mp-link-size-xs-font-size`, `--mp-link-size-sm-font-size`, `--mp-link-size-md-font-size`, `--mp-link-size-lg-font-size`, `--mp-link-size-xl-font-size`. Defaults 12/13/14/16/18px. md references `--mp-link-font-size`; icons/loading icons use 1em.
