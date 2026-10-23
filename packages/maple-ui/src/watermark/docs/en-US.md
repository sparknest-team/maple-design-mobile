# Watermark

Add text or image watermarks to a page or local region. The component responds to prop and theme changes automatically.

## 案例

### Text Watermark

The local Demo exposes dark surface, visibility, and synthetic text controls. It explicitly sets font.color to white at 0.4 alpha on the dark surface and black at 0.25 on white. Text/color changes regenerate the PNG; pointer-events:none lets the content button receive clicks and Enter. Hiding disposes the instance; restoring creates one layer and preserves Demo counters. This checks explicit local colors and cleanup, not default theme Tokens, whole-site dark mode, tamper resistance, or body-text contrast compliance.

```demo
../example/demos/text-watermark.vue
```

### Multiline Text

```demo
../example/demos/multiline.vue
```

### Custom Gap

```demo
../example/demos/custom-gap.vue
```

### Custom Offset

```demo
../example/demos/custom-offset.vue
```

### Custom Rotate

```demo
../example/demos/custom-rotate.vue
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

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
