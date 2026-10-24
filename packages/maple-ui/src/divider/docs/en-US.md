# Divider

Separate content sections in lists and layouts.

## Examples

### Basic Usage

Separate adjacent content sections.

```demo
../example/demos/basic-usage.vue
```

### Spacing & Inset

Compare five presets, numbers, CSS lengths and asymmetric pairs. The vertical example shows how spacing follows orientation.

```demo
../example/demos/size.vue
```

### Line Style

Compare solid, dashed, dotted and double lines using `type`. Use a `thickness` of at least 3px for a visible double line.

```demo
../example/demos/type.vue
```

### With Text

Use `description` and `text-align` to position text at the start, center or end. Toggle RTL to inspect logical start/end alignment.

```demo
../example/demos/with-desc.vue
```

### Custom Content

The default slot takes priority over `description`. Provide padding for custom content in the caller.

```demo
../example/demos/custom.vue
```

### Color, Thickness & Opacity

Customize the line using `color`, `thickness` and `opacity`. Zero opacity preserves layout; `hairline` takes priority over `thickness`.

```demo
../example/demos/color.vue
```

### Vertical Divider

Set `orientation="vertical"` in a flex container with available height. Text follows the vertical direction.

```demo
../example/demos/vertical.vue
```

### Live Properties

Toggle orientation, default slot text, opacity and hairline to inspect updates and restoration.

```demo
../example/demos/live-properties.vue
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
| `orientation` | Divider orientation | `horizontal` \| `vertical` | `horizontal` |
| `type` | Line style | `solid` \| `dashed` \| `dotted` \| `double` | `solid` |
| `text-align` | Text position along the line; start/end follow logical direction | `start` \| `center` \| `end` | `center` |
| `description` | Description text; the default slot takes priority | `string` | — |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | `DividerSize` | — |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | `DividerSize` | `md` |
| `thickness` | Line width in px; theme defaults to 1px; hairline takes priority | `number` | — |
| `hairline` | Scale the theme line width by half; 0.5px with the default theme | `boolean` | `false` |
| `color` | Line color; defaults to the theme border color | `string` | — |
| `opacity` | Opacity of the entire divider, including text, from 0 to 1; zero preserves layout | `number` | — |

### Spacing values

`DividerSize = number | string | Array<number | string>`

`inset` controls the ends of the line; `spacing` controls the outer gap between the line and adjacent content. Both accept presets `xs`, `sm`, `md`, `lg`, `xl`, a number in px, a CSS length, or an array. A scalar or single-item array applies to both ends; `[start, end]` sets each end separately. Array entries are lengths, not preset names.

| Orientation | inset pair | spacing pair |
| --- | --- | --- |
| horizontal | inline start/end inset (right/left in RTL) | top/bottom spacing |
| vertical | top/bottom inset | inline start/end spacing (right/left in RTL) |

`inset` has no inset by default; `spacing` defaults to the platform’s `md` spacing. Presets use platform theme tokens, so pixel values may differ.

### Slots

| Slot | Description |
| --- | --- |
| `default` | Custom divider content; overrides description |

## Types

```ts
import type { DividerProps, DividerInstance, DividerSize } from '@maple-design/ui'
```

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-divider-color` | `var(--mp-sys-color-border-default)` |
| `--mp-divider-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-divider-border-width` | `1px` |
| `--mp-divider-text-padding` | `8px` |
| `--mp-divider-text-align-inset` | `24px` |
| `--mp-divider-orientation-vertical-inset-xs` | `2px` |
| `--mp-divider-orientation-horizontal-inset-xs` | `12px` |
| `--mp-divider-orientation-vertical-spacing-xs` | `4px` |
| `--mp-divider-orientation-horizontal-spacing-xs` | `8px` |
| `--mp-divider-orientation-vertical-inset-sm` | `4px` |
| `--mp-divider-orientation-horizontal-inset-sm` | `16px` |
| `--mp-divider-orientation-vertical-spacing-sm` | `8px` |
| `--mp-divider-orientation-horizontal-spacing-sm` | `12px` |
| `--mp-divider-orientation-vertical-inset-md` | `6px` |
| `--mp-divider-orientation-horizontal-inset-md` | `24px` |
| `--mp-divider-orientation-vertical-spacing-md` | `12px` |
| `--mp-divider-orientation-horizontal-spacing-md` | `16px` |
| `--mp-divider-orientation-vertical-inset-lg` | `8px` |
| `--mp-divider-orientation-horizontal-inset-lg` | `32px` |
| `--mp-divider-orientation-vertical-spacing-lg` | `16px` |
| `--mp-divider-orientation-horizontal-spacing-lg` | `24px` |
| `--mp-divider-orientation-vertical-inset-xl` | `12px` |
| `--mp-divider-orientation-horizontal-inset-xl` | `40px` |
| `--mp-divider-orientation-vertical-spacing-xl` | `24px` |
| `--mp-divider-orientation-horizontal-spacing-xl` | `32px` |

Preset values follow the platform theme. Text padding is 16px on desktop and 8px on mobile.
