# Elevation

### Intro

Shadow elevation levels (`mp-elevation--0` … `mp-elevation--24`) for dimensional surfaces, imported separately.  
Cedar counterpart: `c-elevation--0` … `--24` (ships with box-shadow tools).

### Import Style

```js
// playground-ignore
import '@maple-design/ui/es/style/elevation.css'
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
