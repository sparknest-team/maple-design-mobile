<!-- Source: src/badge/docs/en-US.md; locale: en-US; page: /en-US/badge -->

# Badge

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Basic examples

### Basic usage

Badges use a red background and white text by default.

Example source: src/badge/example/demos/basic.vue

```vue
<template>
  <mp-space wrap :size="24"
    ><mp-badge :content="9"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="9" dot
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge
      ><template #content><span aria-label="New activity">!</span></template
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

## Appearance and states

### Statuses and colors

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Badge content | Statuses and colors, Appearance configuration comparison |
| `status` | Semantic status | Statuses and colors |
| `mode` | Layout mode | Statuses and colors |
| `description` | Fallback description text | Statuses and colors |
| `color` | Custom color; outline uses it for border and text | Statuses and colors |
| `text-color` | Content text color | Statuses and colors |
<!-- demo-config-notes:end -->


Example source: src/badge/example/demos/color.vue

```vue
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <mp-space direction="column">
    <mp-space wrap
      ><mp-badge
        v-for="status in statuses"
        :key="status"
        :status="status"
        mode="inline"
        :description="status"
        :content="1"
    /></mp-space>
    <mp-space wrap><mp-badge v-for="status in statuses" :key="status" :status="status" :content="status" /></mp-space>
    <mp-space wrap
      ><mp-badge color="#7816ff" text-color="#ffffff" content="Purple" /><mp-badge
        color="#005f73"
        text-color="#ffffff"
        content="Teal"
    /></mp-space>
  </mp-space>
</template>
```

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for notification counts and markers. Adjust variant, status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

Example source: src/badge/example/demos/appearance-lab.vue

```vue
<script setup lang="ts">
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'default', status: 'default', size: 'md' })
const demoCompareFields = [
  { name: 'variant', values: ['default', 'outline'] },
  { name: 'status', values: ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] },
  { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-radio-group
          v-model="__demoAppearance['variant']"
          aria-label="variant"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'outline', value: 'outline' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'secondary', value: 'secondary' },
            { label: 'tertiary', value: 'tertiary' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ]"
          aria-label="status"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-badge :content="1000" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }" />
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

## Layout and arrangement

### Positions and offsets

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `position` | Physical corner or left/right midpoint inside the host box, default top-right. Only used in floating mode; RTL does not mirror it | Positions and offsets |
| `content` | Badge content | Positions and offsets |
| `dot` | Display a dot | Positions and offsets |
| `offset-x` | Horizontal offset; ignored in inline mode | Positions and offsets |
| `offset-y` | Vertical offset | Positions and offsets |
| `mode` | Layout mode | Positions and offsets |
<!-- demo-config-notes:end -->


Example source: src/badge/example/demos/position.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const offset = ref(0)
const dot = ref(false)
const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right'] as const
const inlinePositions = ['start', 'end'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-button @click="offset++">Offset +1</mp-button><mp-button @click="offset--">Offset -1</mp-button
      ><mp-button @click="offset = 0">Reset</mp-button><mp-switch v-model="dot" aria-label="Toggle dot"
    /></mp-space>
    <output aria-live="polite">Offset: {{ offset }}px</output>
    <mp-space wrap :size="32"
      ><mp-badge
        v-for="position in positions"
        :key="position"
        :position="position"
        :content="100"
        :dot="dot"
        :offset-x="offset"
        :offset-y="offset"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor">{{
          position
        }}</span></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge
        v-for="position in inlinePositions"
        :key="position"
        mode="inline"
        :inline-position="position"
        :content="9"
        :dot="dot"
        :offset-y="offset"
        :description="position"
    /></mp-space>
  </mp-space>
</template>
```

## Content and presentation

### Inline and standalone

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Badge content | Inline and standalone, Dot badges, Maximum and zero |
| `dot` | Display a dot | Inline and standalone, Dot badges, Show and hide |
| `description` | Fallback description text | Inline and standalone, Show and hide |
| `show-zero` | Show numeric zero | Maximum and zero, Show and hide |
| `mode` | Layout mode | Inline and standalone |
| `inline-position` | Inline badge at the logical start or end of the host content, default end. Only used in inline mode | Inline and standalone |
<!-- demo-config-notes:end -->


Example source: src/badge/example/demos/inline.vue

```vue
<script setup lang="ts">
const positions = ['start', 'end'] as const
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap><mp-badge :content="1000" /><mp-badge :content="1000" dot /></mp-space>
    <mp-space v-for="position in positions" :key="position" wrap>
      <mp-badge mode="inline" :inline-position="position" :content="9" description="Messages" />
      <mp-badge mode="inline" :inline-position="position" dot :content="9" description="Messages" />
    </mp-space>
  </mp-space>
</template>
```

### Dot badges

Example source: src/badge/example/demos/dot.vue

```vue
<template>
  <mp-space wrap :size="24"
    ><mp-badge dot :content="1"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge dot :content="1" :offset-x="6" :offset-y="-2"
      ><mp-link href="#" @click.prevent>Messages</mp-link></mp-badge
    ></mp-space
  >
</template>
```

### Maximum and zero

Example source: src/badge/example/demos/max.vue

```vue
<template>
  <mp-space wrap :size="24"
    ><mp-badge :content="0"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="0" show-zero
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="100" :max="10"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="100"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="1000" :max="999"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

### Show and hide

Example source: src/badge/example/demos/show.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
const content = ref(1)
</script>

<template>
  <mp-space direction="column">
    <mp-space wrap
      ><mp-switch v-model="show" aria-label="Show badge" /><mp-button @click="content++">Add</mp-button
      ><mp-button @click="content = Math.max(0, content - 1)">Subtract</mp-button></mp-space
    >
    <mp-badge :content="0" :show="show" show-zero description="show-zero true" />
    <mp-badge :content="0" :show="show" :show-zero="false" description="show-zero false" />
    <mp-badge :content="content" :show="show" description="Messages" />
    <mp-badge :content="content" :show="show" dot description="Activity" />
  </mp-space>
</template>
```

## Customization and slots

### Custom content

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Badge content | Custom content |
| `mode` | Layout mode | Custom content |
| `inline-position` | Inline badge at the logical start or end of the host content, default end. Only used in inline mode | Custom content |
<!-- demo-config-notes:end -->


Example source: src/badge/example/demos/content.vue

```vue
<template>
  <mp-space wrap :size="24"
    ><mp-badge content="NEW"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge content="HOT" mode="inline" inline-position="start"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge content="HOT" mode="inline" inline-position="end"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

## Usage notes

### Configuration

All public Badge variables and defaults:

## API

<!-- same-source-api:start -->
Numeric `content` supports finite nonnegative values. Zero appears only when `show-zero` is true; dot mode and the `content` slot follow the same rule. Strings are displayed verbatim, including `0`. Negative and non-finite numbers are hidden. `max=0` disables truncation and an invalid maximum falls back to 99. Offsets accept finite negative values; invalid offsets fall back to `0`. In floating mode positive offsets move inward from the anchored edge, while positive vertical offsets at side midpoints move downward. Inline mode ignores horizontal offset and applies vertical offset as a block margin selected by start/end. A provided default slot counts as a host even when empty. The `content` slot overrides the default badge but remains subject to `show` and numeric zero visibility.

### Badge Props

| Parameter | Description | Type | Default |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- | :---------: |
| description | Fallback description text | `string` | `-` |
| content | Badge content | `number \| string` | `-` |
| max | Maximum displayed numeric badge value. Numeric content above this value is shown as `${max}+`. | `number` | `99` |
| dot | Display a dot | `boolean` | `false` |
| offset-x | Horizontal offset; ignored in inline mode | `number` | `0` |
| offset-y | Vertical offset | `number` | `0` |
| color | Custom color; outline uses it for border and text | `string` | `-` |
| text-color | Content text color | `string` | `-` |
| mode | Layout mode | `'floating' \| 'inline'` | `floating` |
| position | Physical corner or left/right midpoint inside the host box, default top-right. Only used in floating mode; RTL does not mirror it | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'left' \| 'right'` | `top-right` |
| inline-position | Inline badge at the logical start or end of the host content, default end. Only used in inline mode | `'start' \| 'end'` | `end` |
| size | Size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| status | Semantic status | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `danger` |
| show | Show the badge | `boolean` | `true` |
| show-zero | Show numeric zero | `boolean` | `false` |
| variant | Appearance | `'outline' \| 'default'` | `default` |

### Badge Events

No component-specific events.

### Badge Slots

| Slot | Description | Prop |
| ------- | ---------------- | ---- |
| default | Fallback description text | - |
| content | Content displayed inside the badge | - |

### Badge Methods

No public methods.

### Usage notes

Props and slots match across platforms. Without a default slot and with an empty description, the badge renders independently inline. Omitting content displays a dot. Each library reads text direction from its own configuration and supplies its own theme colors and CSS prefix.
<!-- same-source-api:end -->

## Types

```ts
type SemanticStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## CSS Variables

Filled badge text follows Button: primary, info, success, warning, danger and secondary use `content-on-dark`; tertiary uses `content-on-dark` in light mode and `content-on-bright` in dark mode. Default notification badges use red backgrounds and white text; the neutral background remains `#e0e0e0`.

Colored outline text and borders follow Button, using the matching `content-brand`, `content-info`, `content-success`, `content-warning` and `content-danger` semantic roles; secondary and tertiary outlines use `content-secondary` for readability. `variant-outline-bg-color` works for every status and defaults to transparent. The `color` prop overrides outline text and border; `text-color` overrides text further. Both preserve control through the background variable. Recheck contrast after customizing foreground or background.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-badge-bg-color` | `rgb(var(--mp-danger-7))` | `background-color` |
| `--mp-badge-border-color` | `var(--mp-sys-color-surface-default)` | `background-color`, `box-shadow` |
| `--mp-badge-description-size-lg-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-badge-description-size-md-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-badge-description-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-description-size-xl-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-badge-description-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-description-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-badge-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-badge-offset` | `2px` | `bottom`, `left`, `right`, `top` |
| `--mp-badge-ring-width` | `2px` | `box-shadow`, `line-height` |
| `--mp-badge-size-lg-border-radius` | `28px` | `border-radius` |
| `--mp-badge-size-lg-dot-height` | `7px` | `height` |
| `--mp-badge-size-lg-dot-width` | `7px` | `width` |
| `--mp-badge-size-lg-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-badge-size-lg-height` | `28px` | `line-height`, `min-width` |
| `--mp-badge-size-lg-padding` | `0 var(--mp-sys-space-4)` | `padding` |
| `--mp-badge-size-lg-scale` | `1` | `transform` |
| `--mp-badge-size-lg-space` | `var(--mp-sys-space-3)` | `margin-inline` |
| `--mp-badge-size-md-border-radius` | `24px` | `border-radius` |
| `--mp-badge-size-md-dot-height` | `6px` | `height` |
| `--mp-badge-size-md-dot-width` | `6px` | `width` |
| `--mp-badge-size-md-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-md-height` | `24px` | `line-height`, `min-width` |
| `--mp-badge-size-md-padding` | `0 var(--mp-sys-space-4)` | `padding` |
| `--mp-badge-size-md-scale` | `1` | `transform` |
| `--mp-badge-size-md-space` | `var(--mp-sys-space-3)` | `margin-inline` |
| `--mp-badge-size-sm-border-radius` | `20px` | `border-radius` |
| `--mp-badge-size-sm-dot-height` | `5px` | `height` |
| `--mp-badge-size-sm-dot-width` | `5px` | `width` |
| `--mp-badge-size-sm-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-sm-height` | `20px` | `line-height`, `min-width` |
| `--mp-badge-size-sm-padding` | `0 var(--mp-sys-space-3)` | `padding` |
| `--mp-badge-size-sm-scale` | `0.8333` | `transform` |
| `--mp-badge-size-sm-space` | `var(--mp-sys-space-1)` | `margin-inline` |
| `--mp-badge-size-xl-border-radius` | `32px` | `border-radius` |
| `--mp-badge-size-xl-dot-height` | `8px` | `height` |
| `--mp-badge-size-xl-dot-width` | `8px` | `width` |
| `--mp-badge-size-xl-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-badge-size-xl-height` | `32px` | `line-height`, `min-width` |
| `--mp-badge-size-xl-padding` | `0 10px` | `padding` |
| `--mp-badge-size-xl-scale` | `1` | `transform` |
| `--mp-badge-size-xl-space` | `var(--mp-sys-space-4)` | `margin-inline` |
| `--mp-badge-size-xs-border-radius` | `20px` | `border-radius` |
| `--mp-badge-size-xs-dot-height` | `4px` | `height` |
| `--mp-badge-size-xs-dot-width` | `4px` | `width` |
| `--mp-badge-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-badge-size-xs-height` | `20px` | `line-height`, `min-width` |
| `--mp-badge-size-xs-padding` | `0 var(--mp-sys-space-3)` | `padding` |
| `--mp-badge-size-xs-scale` | `0.6667` | `transform` |
| `--mp-badge-size-xs-space` | `0px` | `margin-inline` |
| `--mp-badge-status-danger-bg-color` | `rgb(var(--mp-danger-7))` | `background-color` |
| `--mp-badge-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-default-bg-color` | `#e0e0e0` | `background-color` |
| `--mp-badge-status-default-text-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-badge-status-info-bg-color` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-badge-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-primary-bg-color` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-badge-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-secondary-bg-color` | `rgb(var(--mp-gray-6))` | `background-color` |
| `--mp-badge-status-secondary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-success-bg-color` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-badge-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-tertiary-bg-color` | `rgb(var(--mp-gray-7))` | `background-color` |
| `--mp-badge-status-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-status-warning-bg-color` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-badge-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-badge-variant-outline-bg-color` | `transparent` | `background-color` |
| `--mp-badge-variant-outline-status-danger-text-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |
| `--mp-badge-variant-outline-status-default-text-color` | `var(--mp-sys-color-content-primary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-info-text-color` | `var(--mp-sys-color-content-info)` | `border`, `color` |
| `--mp-badge-variant-outline-status-primary-text-color` | `var(--mp-sys-color-content-brand)` | `border`, `color` |
| `--mp-badge-variant-outline-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-success-text-color` | `var(--mp-sys-color-content-success)` | `border`, `color` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` | `border`, `color` |
| `--mp-badge-variant-outline-status-warning-text-color` | `var(--mp-sys-color-content-warning)` | `border`, `color` |
| `--mp-badge-variant-outline-text-color` | `var(--mp-sys-color-content-danger)` | `border`, `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-badge-bg-color: rgb(var(--mp-danger-7));
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Color override boundaries

The bg-color fallback and danger fill use red backgrounds with white text: danger level 7 in light mode and level 4 in dark mode. Fixed neutral light gray and secondary/tertiary gray levels are intentional component colors. Override the border-color isolation ring to match the host surface. Callers must ensure contrast for custom color/text-color values.
