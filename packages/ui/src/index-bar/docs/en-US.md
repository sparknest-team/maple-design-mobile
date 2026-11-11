# IndexBar

### Intro

Hyperlinks to scroll on one page.

## Basic examples

### Basic Usage

When you click the index bar, it will automatically jump to the corresponding `IndexAnchor` anchor position.

```demo
../example/demos/basic.vue
```

## Lifecycle and edge cases

### Deactivation, disposal and retained commands

```demo
../example/demos/lifecycle.vue
```

## Reading direction

The default index list sits at inline end. Letter/item order and vertical scroll coordinates do not reverse. Safe areas and sticky top offsets retain their physical meaning.

No index is initially active until scrolling or `scrollTo` selects one. Navigation uses native buttons supporting Tab, Enter and Space. Provide readable, noninteractive content in `anchor-name`.

Identifiers use strict equality: numeric `0` differs from string `"0"`. An omitted index is excluded; an empty string is valid. Use unique identifiers; with duplicates, programmatic navigation uses the first match. `duration` is read as milliseconds from a number or numeric string; nonpositive or nonfinite values scroll immediately. `sticky-offset-top` uses the existing length conversion and refers to the physical top. A new scroll command replaces the previous one; deactivation and unmount cancel pending scrolling.

## API

### IndexBar Props

| Prop | Description | Type | Default |
| ------------------- | -------------------------- | ------------------ | ------- |
| `sticky` | Whether to enable anchor sticky top | _boolean_ | `true` |
| `sticky-offset-top` | Anchor offset top when sticky | _number \| string_ | `0` |
| `hide-list` | Whether to hide anchor list | _boolean_ | `false` |
| `sticky-css-mode` | Enable native `css sticky` mode | _boolean_ | `false` |
| `z-index` | z-index | _number \| string_ | `1` |
| `highlight-color` | Index character highlight color | _string_ | `-` |
| `duration` | Animation duration | _string \| number_ | `0` |

### IndexAnchor Props

| Prop | Description | Type | Default |
| ------- | -------- | ------------------ | ------ |
| `index` | Index | _number \| string_ | `-` |

### IndexBar Events

| Event | Description | Callback arguments |
| -------- | ---------------------------- | ------------------------- |
| `click` | Emitted when an index is clicked | `index: number \| string` |
| `change` | Emitted when active index changed | `index: number \| string` |

### IndexBar Slots

| Name | Description | Prop |
| --------- | ---------- | ---- |
| `default` | Index-bar content | `-` |
| `anchor-name` | Navigation button content; use noninteractive content | `{ anchorName: number \| string }` |

### IndexAnchor Slots

| Name | Description | Prop |
| ------------- | -------------- | ----------------------------- |
| `default` | Custom index character | `-` |

### IndexBar Methods

Access IndexBar through ref to call instance methods

| Method | Description | Arguments | Returns |
| ---------- | -------------- | ------------------------------------------------------------ | ------ |
| `scrollTo` | Scroll to target element | `index: number \| string, options?: IndexBarScrollToOptions` | `-` |

## Types

### IndexBarScrollToOptions

| Prop | Description | Type | Default |
| ------- | ------------------------------------- | --------- | ------ |
| `event` | Prevent `change` emit event when `false` | _boolean_ | `-` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-index-bar-list-bottom` | `auto` | `bottom` |
| `--mp-index-bar-list-item-active-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-index-bar-list-item-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-index-bar-list-item-font-size` | `var(--mp-font-size-xs)` | `font-size` |
| `--mp-index-bar-list-item-height` | `14px` | `height` |
| `--mp-index-bar-list-item-padding` | `0 10px` | `padding` |
| `--mp-index-bar-list-left` | `auto` | `inset-inline-start` |
| `--mp-index-bar-list-right` | `0` | `inset-inline-end` |
| `--mp-index-bar-list-top` | `50%` | `top` |
| `--mp-index-bar-list-transform` | `translate(0, -50%)` | `transform` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-index-bar-list-item-active-color: var(--mp-sys-color-content-danger);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
