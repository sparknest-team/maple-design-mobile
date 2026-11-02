# Watermark

Add text or image watermarks to a page or local region. The component responds to prop and theme changes automatically.

## Basic examples

### Text Watermark

The local Demo exposes dark surface, visibility, and synthetic text controls. It explicitly sets font.color to white at 0.4 alpha on the dark surface and black at 0.25 on white. Text/color changes regenerate the PNG; pointer-events:none lets the content button receive clicks and Enter. Hiding disposes the instance; restoring creates one layer and preserves Demo counters. This checks explicit local colors and cleanup, not default theme Tokens, whole-site dark mode, tamper resistance, or body-text contrast compliance.

```demo
../example/demos/text-watermark.vue
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


```demo
../example/demos/multiline.vue
```

### Image Watermark

The image Demo uses only a synthetic SVG data URL. Fail local image selects an intentionally invalid data URL: native Image failure emits source=image and falls back to red FALLBACK 201 text. Enter on Restore image restores the original graphic, retains error history without appending, keeps one layer, and disables Restore again. This does not test external networking, CORS, Canvas faults, or image-load races.

```demo
../example/demos/image-watermark.vue
```

### Fullscreen

The fullscreen layer covers the viewport without intercepting pointer interaction. Turning fullscreen off restores the layer to its local container without moving default-slot content. Repeated toggles must not accumulate fullscreen layers, and unmounting removes that instance's layer. Libraries maintain independent instances; basic toggle evidence does not certify image failures, theme changes or anti-tamper combinations.

```demo
../example/demos/fullscreen.vue
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

```demo
../example/demos/geometry-comparison.vue
```

## API

### Props

| Arguments | Description | Type | Default |
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

### WatermarkFont

| Arguments | Type | Default |
| --- | --- | --- |
| `color` | `string` | `var(--mp-watermark-content-color)` |
| `fontSize` | `number` | `16` |
| `fontFamily` | `string` | `sans-serif` |
| `fontStyle` | `'normal' \| 'italic' \| 'oblique'` | `normal` |
| `fontWeight` | `string \| number` | `normal` |
| `textAlign` | `CanvasTextAlign` | `center` |
| `lineHeight` | `number` | `fontSize × 1.4` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `error` | Image loading or Canvas rendering failed | `{ source: 'image' \| 'canvas'; error: unknown }` |

### Methods

| Method | Description | Returns |
| --- | --- | --- |
| `redraw` | Regenerate the watermark from current props | `Promise<void>` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Page content covered by the watermark |

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-watermark-content-color` | `rgba(0, 0, 0, 0.15)` |
