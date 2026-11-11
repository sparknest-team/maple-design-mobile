<!-- Source: src/link/docs/en-US.md; locale: en-US; page: /en-US/link -->

# Link

### Intro

Link component for hyperlink to web pages.

## Basic examples

### Basic Usage

Example source: src/link/example/demos/en-US/basic.vue

```vue
<template>
  <mp-link href="https://example.com/" target="_blank" rel="noopener noreferrer">Visit example website</mp-link>
</template>
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

Example source: src/link/example/demos/en-US/appearance-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return { sizes }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">五种尺寸</span><span lang="en-US">Sizes</span></h4>
      <mp-space direction="column" size="md">
        <mp-space v-for="size in scene1.sizes" :key="size" wrap size="md" align="center">
          <mp-link :size="size" status="primary">{{ size }} Link</mp-link>
          <mp-link :size="size" status="primary" icon>{{ size }} Icon</mp-link>
          <mp-link :size="size" loading>{{ size }} Loading</mp-link>
        </mp-space>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="semantic-status">
      <h4><span lang="zh-CN">语义状态</span><span lang="en-US">Semantic Status</span></h4>
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
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
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

### Hover Background

Both platforms support hoverable (false by default). It adds padding and hover/active backgrounds without changing underline. Keyboard focus uses :focus-visible independently of hoverable.

Disabled or loading links remove href / target / rel, block click and leave the Tab order, including explicit tabindex. Loading takes precedence over the icon slot, which updates dynamically.

Example source: src/link/example/demos/en-US/hoverable.vue

```vue
<template>
  <mp-space size="sm">
    <mp-link hoverable href="#link">Hover background</mp-link>
    <mp-link href="#link">Tab key focus</mp-link>
  </mp-space>
</template>
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

### Firefly palette

Primary, secondary and tertiary links use the same foreground roles as Button text/outline variants. The example uses a navy surface for bright primary/violet text and a light surface for light-mode secondary text, matching the Button examples.

Example source: src/link/example/demos/en-US/theme-colors.vue

```vue
<script setup lang="ts">
import { Themes } from '@maple-design/ui-vue'

const modes = ['light', 'dark'] as const
const statuses = ['primary', 'secondary', 'tertiary'] as const
</script>
<template>
  <mp-theme-provider v-for="mode in modes" :key="mode" :style-vars="Themes.firefly[mode]">
    <p>Firefly {{ mode }}</p>
    <div
      v-for="status in statuses"
      :key="status"
      :style="{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '12px',
        background: status === 'secondary' && mode === 'light' ? '#ffffff' : '#17224b',
      }"
    >
      <mp-link :status="status">{{ status }} Link</mp-link>
      <mp-button :status="status" variant="text">{{ status }} Button</mp-button>
    </div>
  </mp-theme-provider>
</template>
```

## Interaction and control

### Loading

Example source: src/link/example/demos/en-US/loading.vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const loading = ref(false)
const ready = ref(false)
const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Example report: ready.')
let timer: ReturnType<typeof setTimeout> | undefined

function prepareDownload(event: MouseEvent) {
  if (ready.value) {
    return
  }
  event.preventDefault()
  loading.value = true
  // Simulate preparation, then let the ready link use the native download.
  timer = setTimeout(() => {
    ready.value = true
    loading.value = false
    timer = undefined
  }, 1000)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <mp-space size="sm">
    <mp-link :href="href" download="report.txt" loading>Loading</mp-link>
    <mp-link :href="href" download="report.txt" :loading="loading" @click="prepareDownload">
      {{ loading ? 'Preparing' : ready ? 'Download sample report' : 'Prepare report' }}
    </mp-link>
  </mp-space>
  <p>
    Click or press Enter to prepare the report, then activate the ready link to download it. Business code controls
    loading.
  </p>
</template>
```

## API

### Native links and manual loading

Supply href for navigation. Disabled/loading links that originally had href retain the link role, remove navigation attributes and leave the Tab order. Native download, hreflang, referrerpolicy and ARIA attributes are forwarded. loading takes precedence over the icon slot. click is a MouseEvent notification using Vue once semantics; returned Promises do not manage loading. Use Button for business actions without a navigation target.

On first activation, business code prepares the report. Once ready, activation uses the browser's native download behavior. Unmounting cancels preparation.


### Link Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `size` | Five text, icon and spinner sizes | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' |
| `href` | Native link destination | string | - |
| `target` | Native target | string | - |
| `rel` | Native link relationship | string | - |
| `status` | Semantic status | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | 'default' |
| `underline` | Underline policy | 'always' \| 'hover' \| 'none' | 'none' |
| `hoverable` | Padded hover/active backgrounds | boolean | false |
| `icon` | Show the leading icon; icon slot takes priority | boolean | false |
| `loading` | Show spinner and block navigation/click | boolean | false |
| `disabled` | Disable the link | boolean | false |


### Link Events

| Event | Description | Arguments |
| --- | ------------------------------------------------- | --- |
| `click` | Triggered when the link is clicked | `event: MouseEvent` |

### Link Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Link content | `-` |
| `icon` | Custom link icon | `-` |

## Types

```ts
import type { LinkProps, LinkSize, LinkUnderline, LinkInstance } from '@maple-design/ui-vue'
```

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-link-bg-active` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-link-bg-hover` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-link-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-link-danger-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-link-default-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-link-disabled-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-link-focus-color` | `currentColor` | `outline` |
| `--mp-link-focus-offset` | `2px` | `outline-offset` |
| `--mp-link-focus-opacity` | `0.8` | `opacity` |
| `--mp-link-focus-width` | `2px` | `outline` |
| `--mp-link-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-link-icon-size` | `1em` | `font-size` |
| `--mp-link-info-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-link-line-height` | `1.5` | `line-height` |
| `--mp-link-margin-icon-right` | `0.25em` | `margin-inline-end` |
| `--mp-link-padding-horizontal` | `0.25em` | `padding` |
| `--mp-link-padding-vertical` | `1px` | `padding` |
| `--mp-link-primary-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-link-secondary-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-link-size-icon` | `var(--mp-link-icon-size)` | `font-size` |
| `--mp-link-size-lg-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-link-size-md-font-size` | `var(--mp-link-font-size)` | `font-size` |
| `--mp-link-size-sm-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-link-size-xl-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-link-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-link-spin-duration` | `1s` | `animation` |
| `--mp-link-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-link-tertiary-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-link-text-color` | `var(--mp-link-primary-color)` | `color` |
| `--mp-link-text-color-active` | `var(--mp-link-text-color)` | `color` |
| `--mp-link-text-color-default` | `var(--mp-link-default-color)` | `color` |
| `--mp-link-text-color-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-error` | `var(--mp-link-danger-color)` | `color` |
| `--mp-link-text-color-error-active` | `var(--mp-link-text-color-error)` | `color` |
| `--mp-link-text-color-error-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-error-hover` | `var(--mp-link-text-color-error)` | `color` |
| `--mp-link-text-color-error-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-hover` | `var(--mp-link-text-color)` | `color` |
| `--mp-link-text-color-info` | `var(--mp-link-info-color)` | `color` |
| `--mp-link-text-color-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-primary` | `var(--mp-link-primary-color)` | `color` |
| `--mp-link-text-color-secondary` | `var(--mp-link-secondary-color)` | `color` |
| `--mp-link-text-color-success` | `var(--mp-link-success-color)` | `color` |
| `--mp-link-text-color-success-active` | `var(--mp-link-text-color-success)` | `color` |
| `--mp-link-text-color-success-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-success-hover` | `var(--mp-link-text-color-success)` | `color` |
| `--mp-link-text-color-success-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-tertiary` | `var(--mp-link-tertiary-color)` | `color` |
| `--mp-link-text-color-warning` | `var(--mp-link-warning-color)` | `color` |
| `--mp-link-text-color-warning-active` | `var(--mp-link-text-color-warning)` | `color` |
| `--mp-link-text-color-warning-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-warning-hover` | `var(--mp-link-text-color-warning)` | `color` |
| `--mp-link-text-color-warning-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-transition-duration` | `0.15s` | `transition` |
| `--mp-link-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-link-border-radius: var(--mp-sys-radius-md);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Custom styling

Customize colors, icons and focus appearance through `--mp-link-*` CSS variables.

Text colors match Button text variants: default uses content-primary; secondary/tertiary use content-secondary; colored statuses use their semantic content colors; disabled/loading use content-disabled. Both brands inherit these in light/dark modes.

Size variables: `--mp-link-size-xs-font-size`, `--mp-link-size-sm-font-size`, `--mp-link-size-md-font-size`, `--mp-link-size-lg-font-size`, `--mp-link-size-xl-font-size`. Defaults 12/13/14/16/18px. md references `--mp-link-font-size`; icons/loading icons use 1em.
