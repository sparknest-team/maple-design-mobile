# Watermark

Add text or image watermarks to a page or local region. The component responds to prop and theme changes automatically.

### Text Watermark

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

```demo
../example/demos/image-watermark.vue
```

### Fullscreen

```demo
../example/demos/fullscreen.vue
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
