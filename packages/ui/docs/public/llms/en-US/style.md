<!-- Source: src/style/docs/en-US.md; locale: en-US; page: /en-US/style -->

# Elevation

### Intro

Shadow elevation levels (`mp-elevation--0` … `mp-elevation--24`) for dimensional surfaces, included in the full Maple stylesheet.  
Cedar counterpart: `c-elevation--0` … `--24` (ships with box-shadow tools).

### Import Style

```js
// playground-ignore
import '@maple-design/ui-vue/style'
```

### Basic Usage
Shadows are divided into `0-24` levels, and the higher the level, the higher the altitude.

```html
<template>
  <mp-space class="elevation-example-list" :size="[40, 0]" justify="space-between">
    <div
      class="elevation-example-item"
      :class="`mp-elevation--${e - 1}`"
      v-for="e in 25"
      :key="e"
    >
      {{ e - 1 }}
    </div>
  </mp-space>
</template>

<style>
.elevation-example-list {
  padding: 2vmin 4vmin;
}

.elevation-example-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24vmin;
  height: 24vmin;
  border-radius: 4px;
}
</style>
```

## Basic examples

### Basic usage

Example source: src/style/example/basic.vue

```vue
<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'

const elevations = Array.from({ length: 25 }).map((_, index) => index)

onThemeChange()
</script>

<template>
  <mp-space wrap class="elevation-example-list" :size="['10vmin', 0]" justify="space-between">
    <div
      v-for="e in elevations"
      :key="e"
      class="elevation-example-item"
      :class="`mp-elevation--${e}`"
      :style="{ background: 'var(--mp-paper-background)' }"
    >
      {{ e }}
    </div>
  </mp-space>
</template>

<style lang="less">
@import '../../style/elevation';
</style>

<style>
.elevation-example-list {
  padding: 8vmin 4vmin;
}

.elevation-example-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24vmin;
  height: 24vmin;
  border-radius: 4px;
}
</style>
```
