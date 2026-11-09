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

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Icons, labels, values and extra content follow reading order, with logical start/end spacing. Explicit device safe-area and physical-position contracts do not reverse.

## API

`clickable` gives the main content button semantics, focus and Enter/Space activation. When omitted it follows `ripple`; explicit false omits the main action semantics. Use `action-aria-label` when the content does not name the action. `extra` is separate and can contain independent controls; their clicks bubble by default, so use `.stop` for independent actions. Do not nest interactive controls in the main content of an actionable cell. `title-class` and `description-class` affect only their default nodes; slot content owns its styles. Numeric `border-offset` must be finite; negative values and zero are valid, while invalid numbers use default spacing.

### Cell Props

| Prop | Description | Type | Default |
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
| `clickable` | Enable the main action; follows ripple when omitted | `boolean` | `—` |
| `action-aria-label` | Accessible name of the main action | `string` | `—` |

### Cell Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when the cell is clicked | `event: Event` |

### Cell Slots

| Name | Description | Prop |
| ----- | -------------- | -------- |
| `default` | Main content; overrides title | `-` |
| `icon` | Custom left-icon area | `-` |
| `description` | Description content | `-` |
| `extra` | Extra of cell | `-` |

## CSS Variables

Customize these CSS variables through [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-cell-border-color` | `var(--mp-color-border-2)` | `border-bottom` |
| `--mp-cell-border-left` | `12px` | `left` |
| `--mp-cell-border-right` | `12px` | `right` |
| `--mp-cell-color` | `var(--mp-color-text)` | `color` |
| `--mp-cell-description-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-cell-description-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-cell-description-margin-top` | `4px` | `margin-top` |
| `--mp-cell-extra-left` | `8px` | `margin-inline-start` |
| `--mp-cell-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-cell-icon-right` | `8px` | `margin-inline-end` |
| `--mp-cell-min-height` | `40px` | `min-height` |
| `--mp-cell-padding` | `10px 12px` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-cell-border-color: var(--mp-color-border-2);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
