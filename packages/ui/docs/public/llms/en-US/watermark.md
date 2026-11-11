<!-- Source: src/watermark/docs/en-US.md; locale: en-US; page: /en-US/watermark -->

# Watermark

Add text or image watermarks to a page or local region. The component responds to prop and theme changes automatically.

## Basic examples

### Text Watermark

The local Demo exposes dark surface, visibility, and synthetic text controls. It explicitly sets font.color to white at 0.4 alpha on the dark surface and black at 0.25 on white. Text/color changes regenerate the PNG; pointer-events:none lets the content button receive clicks and Enter. Hiding disposes the instance; restoring creates one layer and preserves Demo counters. This checks explicit local colors and cleanup, not default theme Tokens, whole-site dark mode, tamper resistance, or body-text contrast compliance.

Example source: src/watermark/example/demos/text-watermark.vue

```vue
<script setup>
import { ref } from 'vue'

const dark = ref(false)
const shown = ref(true)
const content = ref('LOCAL DEMO 200')
const clicks = ref(0)
</script>

<template>
  <section class="watermark-contrast-demo">
    <mp-checkbox v-model="dark" edit-mode="direct">Dark surface / 深色底</mp-checkbox>
    <mp-checkbox v-model="shown" edit-mode="direct">Show watermark / 显示水印</mp-checkbox>
    <label>Watermark text / 水印文字<mp-input v-model="content" edit-mode="direct" /></label>
    <mp-watermark
      v-if="shown"
      :content="content"
      :font="{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)' }"
      :style="{ background: dark ? '#1f2937' : '#ffffff', color: dark ? '#ffffff' : '#111827' }"
    >
      <div class="watermark-contrast-surface">
        <p>Local synthetic content / 本地合成内容</p>
        <mp-button html-type="button" @click="clicks++">Click through / 点击内容</mp-button>
      </div>
    </mp-watermark>
    <p role="status">Visible: {{ shown }} · Dark: {{ dark }} · Clicks: {{ clicks }}</p>
  </section>
</template>
<style scoped>
.watermark-contrast-surface {
  min-height: 240px;
  display: grid;
  place-content: center;
  gap: 12px;
}
</style>
```

## Content and presentation

### Multiline Text

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | One or more text lines; also used when an image fails | Multiline Text, Image Watermark, Fullscreen |
| `image` | Image URL, preferred over text | Image Watermark |
| `width` | Mark width; measured from content by default | Image Watermark |
| `height` | Mark height; measured from content by default | Image Watermark |
| `font` | Text style | Image Watermark |
| `fullscreen` | Cover the viewport | Fullscreen |
<!-- demo-config-notes:end -->


Example source: src/watermark/example/demos/multiline.vue

```vue
<template>
  <mp-watermark :content="['Maple Design', 'Confidential']">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### Image Watermark

Local image failure uses an invalid data URL, emits a source=image error and falls back to FALLBACK 201 text. Activate Restore image with Enter to restore the image. Error history remains, with one watermark layer.

Example source: src/watermark/example/demos/image-watermark.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const failed = ref(false)
const errors = ref([])
const localImage =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48"><rect width="160" height="48" rx="8" fill="#0284c7"/><circle cx="80" cy="24" r="14" fill="white"/></svg>',
  )
const image = computed(() => (failed.value ? 'data:image/png;base64,invalid-local-image' : localImage))
</script>
<template>
  <section class="watermark-image-failure-demo">
    <mp-checkbox v-model="failed" edit-mode="direct">Fail local image / 本地图片失败</mp-checkbox>
    <mp-button html-type="button" :disabled="!failed" @click="failed = false">Restore image / 恢复图片</mp-button>
    <mp-watermark
      content="FALLBACK 201"
      :image="image"
      :width="160"
      :height="48"
      :font="{ color: '#be123c' }"
      style="background: white"
      @error="errors.push($event.source)"
    >
      <div style="height: 240px" />
    </mp-watermark>
    <p role="status">Mode: {{ failed ? 'failure' : 'image' }} · Errors: {{ errors.join(',') || '-' }}</p>
  </section>
</template>
```

### Fullscreen

The full-screen watermark covers the viewport without intercepting pointer input. Exiting returns it to the local container without moving default-slot content. Repeated toggling does not accumulate layers; unmounting removes that instance.

Example source: src/watermark/example/demos/fullscreen.vue

```vue
<script setup>
import { ref } from 'vue'

const fullscreen = ref(false)
const toggle = () => {
  fullscreen.value = !fullscreen.value
}
</script>

<template>
  <mp-watermark content="Maple UI" :fullscreen="fullscreen" :z-index="99" :offset="[10, 10]">
    <div class="watermark-wrapper">
      <mp-button status="primary" @click="toggle">切换</mp-button>
    </div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

## Customization and slots

### Watermark spacing, offset and rotation

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | One or more text lines; also used when an image fails | Watermark spacing, offset and rotation |
| `gap` | Watermark gap `[x, y]` | Watermark spacing, offset and rotation |
| `offset` | First mark offset; defaults to half the gap | Watermark spacing, offset and rotation |
| `rotate` | Rotation angle | Watermark spacing, offset and rotation |
<!-- demo-config-notes:end -->


Compare repetition gaps, origin offsets and rotation independently of image loading and fullscreen positioning.

Example source: src/watermark/example/demos/geometry-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-gap">
      <h4><span lang="zh-CN">自定义间距</span><span lang="en-US">Custom Gap</span></h4>
      <mp-watermark content="Maple" :gap="[40, 40]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-offset">
      <h4><span lang="zh-CN">自定义偏移量</span><span lang="en-US">Custom Offset</span></h4>
      <mp-watermark content="Maple" :offset="[20, 20]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-rotate">
      <h4><span lang="zh-CN">自定义旋转角度</span><span lang="en-US">Custom Rotate</span></h4>
      <mp-watermark content="Maple" :rotate="22" :offset="[0, 20]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
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
.demo-comparison-case--1 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
.demo-comparison-case--2 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
.demo-comparison-case--3 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
</style>
```

## Usage notes

### Sizing and redraw

- Supply two finite numbers for `gap` and `offset`; non-negative gaps are recommended. A negative gap is currently clamped to zero only for tile dimensions, while drawing and background offsets use the original value, so do not rely on negative gaps for overlap. Use finite positive values for `width`, `height`, `font.fontSize`, and `font.lineHeight`; rendered width and height are at least 1. `rotate` and `zIndex` should be finite. Invalid inputs are not guaranteed to be corrected; valid `alpha` values are finite and between 0 and 1.
- The default `lineHeight` is `Math.round(fontSize * 1.4)`. Canvas parses the text color: `font.color` takes precedence over the computed color token. Supply a color supported by Canvas; CSS variable expressions are not guaranteed to resolve directly. Asynchronously loaded fonts do not trigger redraw automatically; call `redraw()` after they are ready.
- Image load failures emit `error` and fall back to text when available; Canvas failures also emit `error`. `redraw()` returns a Promise and normally handles rendering failures internally. Older asynchronous results cannot overwrite the current layer or report errors after props change or unmount, but the underlying image request is not cancelled. The `default` slot is not drawn into the watermark image.

## API

### Watermark Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `content` | One or more text lines; also used when an image fails | `string \| string[]` | `-` |
| `image` | Image URL, preferred over text | `string` | `-` |
| `width` | Mark width; measured from content by default | `number` | `-` |
| `height` | Mark height; measured from content by default | `number` | `-` |
| `gap` | Watermark gap `[x, y]` | `[number, number]` | `[90, 90]` |
| `offset` | First mark offset; defaults to half the gap | `[number, number]` | `[gap[0] / 2, gap[1] / 2]` |
| `rotate` | Rotation angle | `number` | `-22` |
| `font` | Text style | `WatermarkFont` | `-` |
| `z-index` | Layer z-index | `number` | `6` |
| `alpha` | Overall opacity in the `0..1` range | `number` | `1` |
| `anti-tamper` | Restore a removed or modified layer | `boolean` | `true` |
| `grayscale` | Render in grayscale | `boolean` | `false` |
| `repeat` | Repeat the mark | `boolean` | `true` |
| `staggered` | Stagger repeated rows | `boolean` | `true` |
| `fullscreen` | Cover the viewport | `boolean` | `false` |

### WatermarkFont Events

| Event | Description | Arguments |
| --- | --- | --- |
| `error` | Image loading or Canvas rendering failed | `{ source: 'image' \| 'canvas'; error: unknown }` |

### WatermarkFont Methods

| Method | Description | Returns |
| --- | --- | --- |
| `redraw` | Regenerate the watermark from current props | `Promise<void>` |

### WatermarkFont Slots

| Slot | Description |
| --- | --- |
| `default` | Page content covered by the watermark |

## Types

### WatermarkFont

| Prop | Type | Default |
| --- | --- | --- |
| `color` | `string` | `var(--mp-watermark-content-color)` |
| `fontSize` | `number` | `16` |
| `fontFamily` | `string` | `sans-serif` |
| `fontStyle` | `'normal' \| 'italic' \| 'oblique'` | `normal` |
| `fontWeight` | `string \| number` | `normal` |
| `textAlign` | `CanvasTextAlign`<br>`'center' \| 'end' \| 'left' \| 'right' \| 'start'` | `center` |
| `lineHeight` | `number` | `Math.round(fontSize × 1.4)` |

## CSS Variables

The watermark reads its color from the computed CSS variable and redraws when a `class` or `style` change on the component or its current ancestors changes that color. Call `redraw()` after changes that cannot be observed, such as CSSOM or media query changes, or after moving it to a new ancestor. `anti-tamper` restores removal and class/style changes to the managed layer; it is not a security boundary.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-watermark-content-color` | `rgba(0, 0, 0, 0.15)` | Component styling |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-watermark-content-color: rgba(0, 0, 0, 0.15);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
