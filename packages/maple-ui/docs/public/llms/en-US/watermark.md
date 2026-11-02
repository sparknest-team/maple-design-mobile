<!-- Source: src/watermark/docs/en-US.md; locale: en-US; page: /en-US/watermark -->

# Watermark

Add text or image watermarks to a page or local region. The component responds to prop and theme changes automatically.

## 案例

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
    <mp-checkbox v-model="dark" presentation="inline">Dark surface / 深色底</mp-checkbox>
    <mp-checkbox v-model="shown" presentation="inline">Show watermark / 显示水印</mp-checkbox>
    <label>Watermark text / 水印文字<mp-input v-model="content" presentation="inline" /></label>
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

### Multiline Text

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

### Custom Gap

Example source: src/watermark/example/demos/custom-gap.vue

```vue
<template>
  <mp-watermark content="Maple" :gap="[40, 40]">
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

### Custom Offset

Example source: src/watermark/example/demos/custom-offset.vue

```vue
<template>
  <mp-watermark content="Maple" :offset="[20, 20]">
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

### Custom Rotate

Example source: src/watermark/example/demos/custom-rotate.vue

```vue
<template>
  <mp-watermark content="Maple" :rotate="22" :offset="[0, 20]">
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

The image Demo uses only a synthetic SVG data URL. Fail local image selects an intentionally invalid data URL: native Image failure emits source=image and falls back to red FALLBACK 201 text. Enter on Restore image restores the original graphic, retains error history without appending, keeps one layer, and disables Restore again. This does not test external networking, CORS, Canvas faults, or image-load races.

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
    <mp-checkbox v-model="failed" presentation="inline">Fail local image / 本地图片失败</mp-checkbox>
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

The fullscreen layer covers the viewport without intercepting pointer interaction. Turning fullscreen off restores the layer to its local container without moving default-slot content. Repeated toggles must not accumulate fullscreen layers, and unmounting removes that instance's layer. Libraries maintain independent instances; basic toggle evidence does not certify image failures, theme changes or anti-tamper combinations.

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

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `content` | One or more text lines; also used when an image fails | `string \| string[]` | `-` |
| `image` | Image URL, preferred over text | `string` | `-` |
| `width` | Mark width; measured from content by default | `number` | `-` |
| `height` | Mark height; measured from content by default | `number` | `-` |
| `gap` | Horizontal and vertical spacing | `[number, number]` | `[90, 90]` |
| `offset` | First mark offset; defaults to half the gap | `[number, number]` | `[gap[0] / 2, gap[1] / 2]` |
| `rotate` | Rotation in degrees | `number` | `-22` |
| `font` | Text style | `WatermarkFont` | `-` |
| `z-index` | Layer z-index | `number` | `6` |
| `alpha` | Overall opacity in the `0..1` range | `number` | `1` |
| `anti-tamper` | Restore a removed or modified layer | `boolean` | `true` |
| `grayscale` | Render in grayscale | `boolean` | `false` |
| `repeat` | Repeat the mark | `boolean` | `true` |
| `staggered` | Stagger repeated rows | `boolean` | `true` |
| `fullscreen` | Cover the viewport | `boolean` | `false` |

### WatermarkFont

`WatermarkFont` supports `color`, `fontSize`, `fontFamily`, `fontStyle`, `fontWeight`, `textAlign`, and `lineHeight`.

### Events

`error` receives `{ source: 'image' | 'canvas'; error: unknown }` when image loading or Canvas rendering fails.

### Methods

`redraw(): Promise<void>` regenerates the watermark using the current props.

### Slots

The default slot contains the page content covered by the watermark.

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-watermark-content-color` | `rgba(0, 0, 0, 0.15)` |
