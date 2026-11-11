# Paper

### Intro

An easier container using elevation and water effects.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Borders and corner radii

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `bordered` | Show a border independently of elevation | Borders and corner radii |
| `width` | Width | Borders and corner radii |
| `height` | Surface height | Borders and corner radii |
| `elevation` | false disables; true uses level 2; numeric levels 0–24 | Borders and corner radii |
| `round` | 50% radius; a circle only with equal width and height | Borders and corner radii |
| `radius` | Explicit radius, taking priority over round | Borders and corner radii |
<!-- demo-config-notes:end -->


Compare borders, fully rounded corners and explicit radii independently of live updates and ripple interaction.

```demo
../example/demos/surface-comparison.vue
```

## Customization and slots

### Use Slot


Paper is a low-level surface, not a structured Card. It has no variant/status and no default padding. Borders and elevation are independent. Use it for custom panels, form sections or the surface inside a popup; positioning, focus and button semantics remain outside Paper.

```demo
../example/demos/slot.vue
```

## Interaction and control

### Live properties

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `elevation` | false disables; true uses level 2; numeric levels 0–24 | Live properties, Ripple Effect |
| `width` | Width | Live properties, Ripple Effect |
| `height` | Surface height | Live properties, Ripple Effect |
| `bordered` | Show a border independently of elevation | Live properties |
| `round` | 50% radius; a circle only with equal width and height | Live properties |
| `radius` | Explicit radius, taking priority over round | Live properties |
<!-- demo-config-notes:end -->


Border and shadow are independent. An explicit radius overrides round. The inner native button provides keyboard semantics; its click bubbles to Paper and updates parent-owned feedback.

```demo
../example/demos/live-properties.vue
```

### Ripple Effect

```demo
../example/demos/ripple.vue
```

## API

### Paper Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| bordered | Show a border independently of elevation | boolean | false |
| elevation | false disables; true uses level 2; numeric levels 0–24 | boolean / number | false |
| ripple | Opt-in ripple; does not add button semantics | boolean | false |
| radius | Explicit radius, taking priority over round | number / string | — |
| width | Width | number / string | — |
| height | Surface height | number / string | — |
| round | 50% radius; a circle only with equal width and height | boolean | false |
| inline | Use inline-flex | boolean | false |

Numbers and numeric strings for radius/width/height use px. Other strings pass through as CSS lengths, such as 1rem, 50% and calc(100% - 8px). Classes, native attributes and styles fall through to the root.

elevation=false adds no elevation class, true uses level 2, and numeric values are rounded to the nearest integer then clamped to 0–24. NaN/Infinity produce Vue prop validation warnings in development and fall back to 2 at runtime. Numeric radius/width/height values must be finite and nonnegative; invalid numbers remove that inline dimension instead of retaining its previous value, while zero remains valid. Decimal and scientific-notation numeric strings use px. Other CSS strings are parsed by the browser; expressions unsupported by the browser are not promised.

### Paper Events

| Event | Description | Arguments |
| --- | --- | --- |
| click | Triggered when the paper is clicked | MouseEvent |

click only notifies with the original MouseEvent, including bubbling clicks from children. @click.once follows standard Vue event semantics without awaiting listener Promises. PaperProps includes this listener and is consistent between root and subentry. PaperInstance has no additional business execution methods.

### Paper Slots

| Slot | Description |
| --- | --- |
| default | Paper content |

## Types

```ts
import Paper, { Paper as NamedPaper } from '@maple-design/ui-vue/paper'
import type { PaperProps, PaperInstance } from '@maple-design/ui-vue'
import type { PaperProps as SubPaperProps } from '@maple-design/ui-vue/paper'
const surface: PaperProps = { onClick: (event: MouseEvent) => event.preventDefault() }
```

## Usage notes



The default background uses the theme surface color without a pointer cursor. Customize appearance through size, radius, elevation and ripple props.

Built-in motion respects `prefers-reduced-motion: reduce`, keeping content and state feedback while disabling decorative animations. Adapt custom animations to that preference in your application.

## CSS Variables

Built-in themes can override backgrounds/radii. bordered=false reserves no border space; enabled borders use border-box and count within fixed dimensions. Background, border and shadow are independent.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-paper-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-paper-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-paper-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-paper-border-width` | `1px` | `border` |
| `--mp-paper-transition-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-paper-background: var(--mp-sys-color-surface-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
