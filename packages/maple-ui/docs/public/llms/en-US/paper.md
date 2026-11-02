<!-- Source: src/paper/docs/en-US.md; locale: en-US; page: /en-US/paper -->

# Paper

## Examples

### Intro

An easier container using elevation and water effects.

### Basic Usage

Example source: src/paper/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2" width="25vmin" height="25vmin" />
</template>
```

### Border / Border with shadow

Example source: src/paper/example/demos/bordered.vue

```vue
<script setup></script>

<template>
  <mp-space wrap>
    <mp-paper bordered width="25vmin" height="25vmin" />
    <mp-paper bordered :elevation="2" width="25vmin" height="25vmin" />
  </mp-space>
</template>
```

### Ripple Effect

Example source: src/paper/example/demos/ripple.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2" ripple width="25vmin" height="25vmin" />
</template>
```

### Rounded Paper

Example source: src/paper/example/demos/round.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2" width="25vmin" height="25vmin" round />
</template>
```

### Custom Border Radius

Example source: src/paper/example/demos/radius.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2" :radius="8" width="25vmin" height="25vmin" />
</template>
```

### Use Slot


Paper is a low-level surface, not a structured Card. It has no variant/status and no default padding. Borders and elevation are independent. Use it for custom panels, form sections or the surface inside a popup; positioning, focus and button semantics remain outside Paper.

Example source: src/paper/example/demos/slot.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2">
    <mp-cell>纸张</mp-cell>
    <mp-cell>纸张</mp-cell>
    <mp-cell>纸张</mp-cell>
  </mp-paper>
</template>
```

## Live properties

Border and shadow are independent. An explicit radius overrides round. The inner native button provides keyboard semantics; its click bubbles to Paper and updates parent-owned feedback.

Example source: src/paper/example/demos/live-properties.vue

```vue
<script setup>
import { ref } from 'vue'

const bordered = ref(false)
const round = ref(false)
const explicitRadius = ref(false)
const elevated = ref(false)
const clicks = ref(0)
</script>

<template>
  <section class="paper-live-demo">
    <div class="controls">
      <mp-checkbox v-model="bordered" presentation="inline">Paper border</mp-checkbox>
      <mp-checkbox v-model="round" presentation="inline">Round paper</mp-checkbox>
      <mp-checkbox v-model="explicitRadius" presentation="inline">Explicit radius</mp-checkbox>
      <mp-checkbox v-model="elevated" presentation="inline">Paper shadow</mp-checkbox>
    </div>
    <p role="status">Surface clicks: {{ clicks }}</p>
    <mp-paper
      data-testid="live-paper"
      :bordered="bordered"
      :round="round"
      :radius="explicitRadius ? '12' : undefined"
      :elevation="elevated ? 2 : false"
      width="160"
      :height="100"
      @click="clicks++"
    >
      <mp-button html-type="button">Surface action</mp-button>
    </mp-paper>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
[data-testid='live-paper'] {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

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
| `--mp-paper-background`    | `var(--mp-sys-color-surface-default)` |
| `--mp-paper-border-radius` | `4px` |
| `--mp-paper-border-width` | `1px` |
| `--mp-paper-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-paper-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

Numeric dimensions/radius (including numeric strings) use px; CSS lengths are preserved. Explicit radius overrides round. Themes may override background/radius.

Both libraries maintain independent copies of the implementation, Props, styles, tokens and tests; no shared runtime core or instances. Maple migration: default background uses the theme surface; pointer cursor is opt-in with ripple; inline now uses mp-paper--inline. Existing APIs remain supported.

### Governed defaults

| Token | Default |
| --- | --- |
| `--mp-paper-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-paper-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-paper-border-width` | `1px` |
| `--mp-paper-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-paper-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes skip delays and cancel pending transitions. Ripple duration tokens control CSS only: its 250ms lifecycle timers are unchanged, so keep each visual duration at or below 250ms. Custom animation classes remain the caller’s responsibility.
