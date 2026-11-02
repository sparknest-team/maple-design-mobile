# Cell

### Intro

The cell is a single display item in the list. `title` renders the main text; the default slot overrides it when provided.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Icons, descriptions and dividers

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `border` | Whether to show border | Icons, descriptions and dividers, Use As List Item |
| `title` | Main title; overridden by the default slot | Icons, descriptions and dividers |
| `description` | Cell description | Icons, descriptions and dividers |
| `ripple` | Whether to enable the water wave effect | Use As List Item |
| `border-offset` | Border offset | Use As List Item |
<!-- demo-config-notes:end -->


Compare leading icons, supplementary descriptions and row separators according to information hierarchy.

<details>
<summary>Configuration details and limits</summary>

#### Show Icon

The examples render `<m-icon-fire />` in the `#icon` slot. The Resolver imports it on demand without manual imports or registration. The string API `icon="fire"` only resolves icons already registered in the app; string values do not trigger the Resolver.

#### Show Description

The leading icon, title/description text block, and trailing content are vertically centered. Cell manages spacing and alignment for the icon slot; place the icon directly in the slot without internal CSS classes.

</details>

```demo
../example/demos/content-comparison.vue
```

### Use As List Item

```demo
../example/demos/list.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Icons, labels, values and extras follow reading order with logical gaps. Explicit physical placement and device safe-area semantics remain unchanged.

## API

### Props

| Arguments | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `title` | Main title; overridden by the default slot | _string_ | `-` |
| `icon` | Registered left-icon name | _string_ | `-` |
| `description` | Cell description | _string_ | `-` |
| `border` | Whether to show border | _boolean_ | `false` |
| `border-offset` | Border offset | _string \| number_ | `-` |
| `icon-class` | Extra class for the leading icon container, for both the icon prop and slot | _string_ | `-` |
| `title-class` | Title className | _string_ | `-` |
| `description-class` | Description className | _string_ | `-` |
| `extra-class` | Extra className | _string_ | `-` |
| `ripple` | Whether to enable the water wave effect | _boolean_ | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when the cell is clicked | `event: Event` |

### Slots

| Name | Description | Arguments |
| ----- | -------------- | -------- |
| `default` | Main content; overrides title | `-` |
| `icon` | Custom left-icon area | `-` |
| `description` | Description content | `-` |
| `extra` | Extra of cell | `-` |

### Style variables

Customize these CSS variables through [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ----------------- | --- |
| `--cell-color` | `var(--color-text)` |
| `--cell-font-size` | `var(--font-size-md)` |
| `--cell-description-font-size` | `var(--font-size-sm)` |
| `--cell-description-color` | `rgba(0, 0, 0, 0.6)` |
| `--cell-padding` | `10px 12px` |
| `--cell-min-height` | `40px` |
| `--cell-border-color` | `var(--color-border-2)` |
| `--cell-border-left` | `12px` |
| `--cell-border-right` | `12px` |
| `--cell-icon-right` | `8px` |
| `--cell-extra-left` | `8px` |
