<!-- Source: src/palette/docs/en-US.md; locale: en-US; page: /en-US/palette -->

# Palette

### Intro

Maple theme scales are exposed as CSS variables with the `--mp-*` prefix.  
This page only documents raw scales. Text, fill, border, and background semantics live on [Color](#/en-US/color), so the two pages do not duplicate each other.

### Color scales (1–10)

The mobile preview uses the same six scales shown below. Each variable stores `R, G, B` channels and must be wrapped with `rgb()`.

```vue
<script setup>
const hues = [
  { name: 'primary', label: 'Primary' },
  { name: 'success', label: 'Success' },
  { name: 'warning', label: 'Warning' },
  { name: 'danger', label: 'Danger' },
  { name: 'info', label: 'Info' },
  { name: 'gray', label: 'Gray' },
]
const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <div class="palette-demo">
    <h2>Color scales 1–10</h2>
    <div v-for="hue in hues" :key="hue.name" class="hue-block">
      <div class="hue-label">{{ hue.label }}</div>
      <div class="swatch-grid">
        <div
          v-for="step in steps"
          :key="`${hue.name}-${step}`"
          class="swatch"
          :style="{ background: `rgb(var(--mp-${hue.name}-${step}))` }"
        >
          {{ step }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.palette-demo { width: 100%; padding: 16px; }
.hue-block { margin-bottom: 20px; overflow: hidden; border-radius: 8px; }
.hue-label { padding: 10px 12px; color: var(--mp-color-text-2); }
.swatch-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
.swatch { display: flex; align-items: center; justify-content: center; height: 48px; color: #fff; }
</style>
```

## Basic examples

### Basic usage

Example source: src/palette/example/basic.vue

```vue
<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'

onThemeChange()

const hues = [
  { name: 'primary', label: 'Primary' },
  { name: 'success', label: 'Success' },
  { name: 'warning', label: 'Warning' },
  { name: 'danger', label: 'Danger' },
  { name: 'info', label: 'Info' },
  { name: 'gray', label: 'Gray' },
]
const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <div class="palette-demo">
    <h2 class="section-title">色阶 1–10</h2>
    <div v-for="hue in hues" :key="hue.name" class="hue-block">
      <div class="hue-label">{{ hue.label }}</div>
      <div class="swatch-grid">
        <div
          v-for="step in steps"
          :key="`${hue.name}-${step}`"
          class="swatch"
          :style="{ background: `rgb(var(--mp-${hue.name}-${step}))` }"
          :title="`--mp-${hue.name}-${step}`"
        >
          {{ step }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';

.palette-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px 24px;
  color: var(--mp-color-text-1);
}

.section-title {
  margin: 8px 0 16px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.hue-block {
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--mp-color-bg-2);
}

.hue-label {
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: var(--mp-color-text-2);
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 48px;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
}
</style>
```
