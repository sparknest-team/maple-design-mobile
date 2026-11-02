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

### Props

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

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| click | Triggered when the paper is clicked | MouseEvent |

### Slots

| Slot | Description |
| --- | --- |
| default | Paper content |

### Style variables

| Variable | Default |
| --- | --- |
| --mp-paper-background | `var(--mp-sys-color-surface-default)` |
| --mp-paper-border-radius | `4px` |
| --mp-paper-border-width | `1px` |
| --mp-paper-border-color | `var(--mp-sys-color-border-default)` |
| --mp-paper-transition-duration | `var(--mp-sys-motion-duration-slow)` |

Built-in themes can override backgrounds/radii. bordered=false reserves no border space; enabled borders use border-box and count within fixed dimensions. Background, border and shadow are independent.

### Types

```ts
import type { PaperProps, PaperInstance } from '@maple-design/ui'
```

## Independent source copies

Each platform maintains its own component body, props, styles, tokens and contract tests, adapting prefixes/local imports without a cross-library core or shared instances/state.

Maple migration: the default background becomes the theme surface, and the default pointer cursor is removed. The inline class becomes mp-paper--inline. Existing dimensions, radii, elevation and ripple APIs remain.

Built-in motion follows prefers-reduced-motion: reduce, preserving content/state feedback while disabling decorative spinning, shimmer and ripples. Icon name changes skip waiting and cancel unfinished transitions. Ripple duration variables affect only CSS; the 250ms lifecycle timer remains unchanged, so each visual stage should not exceed 250ms. Callers must adapt custom animation classes.
