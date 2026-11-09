# Divider

Separate content sections in lists and layouts.

Inherits the nearest `dir="ltr|rtl"`. Horizontal text start/end follows reading order; vertical start/end remains top/bottom. Inset controls along-line indentation and spacing controls perpendicular margins. Paired horizontal inset and vertical spacing uses logical start/end. Vertical borders use inline start; hairline, border type and aria-orientation retain their meaning. Direction changes preserve content nodes.

## Basic examples

### Basic Usage

Separate adjacent content sections.

```demo
../example/demos/basic-usage.vue
```

## Layout and arrangement

### Vertical Divider

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | Vertical Divider |
| `type` | Line style | Vertical Divider |
| `text-align` | Text position along the line; start/end follow logical direction | Vertical Divider |
| `description` | Description text; the default slot takes priority | Vertical Divider |
<!-- demo-config-notes:end -->


Set `orientation="vertical"` in a flex container with available height. Text follows the vertical direction.

```demo
../example/demos/vertical.vue
```

## Content and presentation

### With Text

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `text-align` | Text position along the line; start/end follow logical direction | With Text |
| `description` | Description text; the default slot takes priority | With Text |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | Line size, style and color |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | Line size, style and color |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | Line size, style and color |
| `type` | Line style | Line size, style and color |
<!-- demo-config-notes:end -->


Use `description` and `text-align` to position text at the start, center or end. Toggle RTL to inspect logical start/end alignment.

```demo
../example/demos/with-desc.vue
```

### Line size, style and color

Compare thickness or insets, line style and color. Text and custom content remain separate.

<details>
<summary>Configuration details and limits</summary>

#### Spacing & Inset

Compare five presets, numbers, CSS lengths and asymmetric pairs. The vertical example shows how spacing follows orientation.

#### Color, Thickness & Opacity

Customize the line using `color`, `thickness` and `opacity`. Zero opacity preserves layout; `hairline` takes priority over `thickness`.

#### Line Style

Compare solid, dashed, dotted and double lines using `type`. Use a `thickness` of at least 3px for a visible double line.

</details>

```demo
../example/demos/line-appearance-comparison.vue
```

## Customization and slots

### Custom Content

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `type` | Line style | Custom Content |
| `description` | Description text; the default slot takes priority | Custom Content |
<!-- demo-config-notes:end -->


The default slot takes priority over `description`. Provide padding for custom content in the caller.

```demo
../example/demos/custom.vue
```

## Interaction and control

### Live Properties

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | Live Properties |
| `opacity` | Opacity of the entire divider, including text, from 0 to 1; zero preserves layout | Live Properties |
| `hairline` | Scale the theme line width by half; 0.5px with the default theme | Live Properties |
| `thickness` | Finite line width of at least 1px; omission uses the 1px theme default; hairline takes precedence | Live Properties |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | Live Properties |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | Live Properties |
<!-- demo-config-notes:end -->


Toggle orientation, default slot text, opacity and hairline to inspect updates and restoration.

```demo
../example/demos/live-properties.vue
```

## Content and layout

### Content height and minimum thickness

Explicit thickness accepts finite numbers greater than or equal to 1. hairline still takes priority, using half the theme width. Values below 1 (including zero and negative values), and non-finite values, are ignored and use the theme width; development builds warn.

Multiline descriptions and custom content occupy their full height, including spacing=0. Subsequent content stays below the divider.

```demo
../example/demos/content-flow.vue
```

## Usage notes

### Configuration

Presets read the active platform theme. Text spacing is 16px on desktop and 8px on mobile.

## API

### Divider Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | `horizontal` \| `vertical` | `horizontal` |
| `type` | Line style | `solid` \| `dashed` \| `dotted` \| `double` | `solid` |
| `text-align` | Text position along the line; start/end follow logical direction | `start` \| `center` \| `end` | `center` |
| `description` | Description text; the default slot takes priority | `string` | — |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | `DividerSize` | — |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | `DividerSize` | `md` |
| `thickness` | Finite line width of at least 1px; omission uses the 1px theme default; hairline takes precedence | `number` | — |
| `hairline` | Scale the theme line width by half; 0.5px with the default theme | `boolean` | `false` |
| `color` | Line color; defaults to the theme border color | `string` | — |
| `opacity` | Opacity of the entire divider, including text, from 0 to 1; zero preserves layout | `number` | — |

### Spacing values

`DividerSize = number | string | [number | string] | [number | string, number | string]`

`inset` controls the ends of the line; `spacing` controls the outer gap between the line and adjacent content. Both accept presets `xs`, `sm`, `md`, `lg`, `xl`, a number in px, a CSS length, or an array. A scalar or single-item array applies to both ends; `[start, end]` sets each end separately. Array entries are lengths, not preset names.

| Direction | inset array order | spacing array order |
| --- | --- | --- |
| horizontal | Inline start/end inset; right/left in RTL | Top/bottom margin |
| vertical | Top/bottom inset | Inline start/end margin; right/left in RTL |

`inset` has no inset by default; `spacing` defaults to the platform’s `md` spacing. Presets use platform theme tokens, so pixel values may differ.


Development checks cover orientation, text-align, type, spacing shape, thickness and opacity. Invalid enums use defaults; invalid inset produces no indentation, invalid spacing falls back to md, and invalid opacity does not override styles. opacity must be finite and within 0–1. Arrays accept one or two lengths and no preset names. Finite negative margins and CSS var/calc expressions remain supported; browsers parse their CSS syntax.

### Divider Slots

| Slot | Description |
| --- | --- |
| `default` | Custom divider content; overrides description |

## Types

```ts
import type { DividerProps, DividerInstance, DividerSize, DividerSizePreset, DividerOrientation, DividerTextAlign, DividerType } from '@maple-design/ui'
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-divider-border-width` | `1px` | `border-inline-start-width`, `border-top-width` |
| `--mp-divider-color` | `var(--mp-sys-color-border-default)` | `border-inline-start-color`, `border-top-color` |
| `--mp-divider-orientation-horizontal-inset-lg` | `32px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-md` | `24px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-sm` | `16px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xl` | `40px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xs` | `12px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-spacing-lg` | `24px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-md` | `16px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-sm` | `12px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xl` | `32px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xs` | `8px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-vertical-inset-lg` | `8px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-md` | `6px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-sm` | `4px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xl` | `12px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xs` | `2px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-spacing-lg` | `16px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-md` | `12px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-sm` | `8px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xl` | `24px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xs` | `4px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-text-align-inset` | `24px` | `height`, `width` |
| `--mp-divider-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-divider-text-padding` | `8px` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-divider-color: var(--mp-sys-color-border-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
