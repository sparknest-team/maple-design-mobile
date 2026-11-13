# TabBar

### Intro

Display navigation and key actions at the bottom of the page.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Appearance and content

### Pill indicator

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Appearance | Pill indicator, Show Badge |
| `active-color` | Color of active tab item | Custom Color |
| `fab-props` | Fab button props | Fab |
<!-- demo-config-notes:end -->


Set `variant="pill"` to show a pill behind the selected icon. The default `standard` style changes the selected color.

```demo
../example/demos/variant.vue
```

### Show Badge

TabBar badges default to size xs and extend outside the top-right edge of the icon. The badge object can override size, position, offsetX and offsetY. Dots, counts and max are supported in both standard and pill styles.

```demo
../example/demos/show-badge.vue
```

### Custom Color

```demo
../example/demos/custom-color.vue
```

### Fab

Use the floating button for a primary action such as creating a post, taking a photo or adding an item. The plus button opens the composer without changing the selected tab.

The button is centered for an even number of tabs and right aligned for an odd number. Use the separate control to compare these layouts.

```demo
../example/demos/fab.vue
```

### Custom selected label

Use the default slot’s `active` parameter to make the selected label bold.

```demo
../example/demos/custom-label.vue
```

## Value model and interaction

### Match By Name

```demo
../example/demos/match-by-name.vue
```

### Click and value-change events

Click the current and a different item to distinguish click notifications from value changes.

```demo
../example/demos/event-comparison.vue
```

### Uncontrolled selection

```demo
../example/demos/uncontrolled.vue
```

### Stable keys and selection

Use the same stable identifier for `key` (node identity) and `name` (selection). Avoid array indices as keys.

```demo
../example/demos/stable-key.vue
```

## Async navigation

### Async selection guards

```demo
../example/demos/async-change.vue
```

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean` | `false` |

External loading blocks tab switching; internal before-hook waiting is merged for display.


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

```demo
../example/demos/loading.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Navigation items follow reading order without changing selection values or item order. Automatic space for a floating button is at inline end; a center button remains centered. Explicit Badge placements remain physical corners.

## API

`default`/`icon` slot active indicates whether this item's name matches modelValue; focus/hover do not change it. activeColor/inactiveColor control current/noncurrent colors.

#### Async operation feedback
Awaited before-* hooks show loading feedback and aria-busy. Rejection/failure restores interaction; repeated input does not restart the same operation. Ordinary event return Promises do not participate. Switching to a different target retains the latest-request-wins rule.

#### guard-error
Emitted once after a switching guard fails, with `(error, value)`.

TabBar uses a group of buttons for state selection, with aria-pressed on the selected item. Give the root an aria-label when needed. Applications handle routing; ordinary events do not await return values.

### Value and default value

Use ordinary `v-model`. `modelValue` is the selected child name; unnamed positional mode uses zero-based indices. `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins, without initialization `update:modelValue`.

### TabBar Props

| Prop | Description | Type | Default |
| ------------------ | ----------------- | ---- | ---- |
| `v-model` | Selected name or index; controlled when provided | _number \| string_ | `undefined` |
| `loading` | Externally controlled loading state; switching is blocked while active | _boolean_ | `false` |
| `default-value` | Initial uncontrolled selection; read once | _number \| string_ | `0` |
| `before-change` | Guard selection; truthy permits, falsy/throw/rejection cancels. Only the latest request may commit | `TabBarBeforeChange`: `(active: number \| string) => unknown`; may return a Promise; arrays of functions are supported | `-` |
| `fixed` | Whether to fixed bottom | _boolean_ | `false` |
| `border` | Whether to show border | _boolean_ | `false` |
| `safe-area` | Whether to adapt to the bottom, left and right safe areas | _boolean_ | `false` |
| `z-index` | Z-index; an explicit prop overrides the CSS variable | _number \| string_ | `undefined`; CSS defaults to `1` |
| `active-color` | Color of active tab item | _string_ | `-` |
| `inactive-color` | Color of inactive tab item | _string_ | `-` |
| `placeholder`  ***3.2.11*** | Whether to generate placeholder elements of the same height at the bottom (`fixed` required) | _boolean_ | `false` |
| `fab-props` | Fab button props | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` | Appearance | _TabBarVariant_：`standard` / `pill` | `standard` |

When model-value is omitted the component manages selection; when provided it only requests updates. Releasing control retains the last controlled value. Numeric names take precedence over unnamed item indices; named items do not match by index.

### TabBarItem Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, matching Icon [name](#/en-US/icon) | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### TabBarItem Events

| Event | Description | Callback arguments |
| ---- | ---- | ---- |
| `click` | Triggered when the cell is clicked | `active: number \| string` |

### TabBar Events

| Event | Description | Callback arguments |
| ---- | ---- | ---- |
| `update:modelValue` | Request a selected-value update | `active: number \| string` |
| `change` | Triggered when switching labels | `active: number \| string` |
| `guard-error` | Emitted when the guard throws or its Promise rejects | `error: unknown, value: number \| string` |
| `fab-click` | Triggered when clicking fab button | `-` |

### TabBarItem Slots

| Name | Description | Prop |
| ---- | ---- | ---- |
| `default` | Custom `label` content; overrides `label` | `active: boolean` |
| `icon` | Custom icon | `active: boolean` |

### TabBar Slots

| Name | Description | Prop |
| ---- | ----------------------- | ---- |
| `default` | Bottom-navigation content | `-` |
| `fab` | Support for inserting a custom Fab button into a component | `-` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

When `z-index` is omitted, the component consumes `--mp-tab-bar-z-index`. An explicit number or CSS string takes precedence. The default visual stacking level is `1`.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` | `background-color` |
| `--mp-tab-bar-border-color` | `var(--mp-color-border-2)` | `border-top` |
| `--mp-tab-bar-fab-border-radius` | `50%` | `border-radius` |
| `--mp-tab-bar-fab-offset` | `4px` | `inset-inline-end`, `margin-inline-end` |
| `--mp-tab-bar-height` | `50px` | `height`, `inset-inline-end`, `margin-inline-end`, `margin-inline-start`, `width` |
| `--mp-tab-bar-item-active-background-color` | `transparent` | `background-color` |
| `--mp-tab-bar-item-active-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-tab-bar-item-focus-color` | `currentColor` | `outline` |
| `--mp-tab-bar-item-focus-offset` | `-2px` | `outline-offset` |
| `--mp-tab-bar-item-focus-width` | `2px` | `outline` |
| `--mp-tab-bar-item-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` | `margin-top` |
| `--mp-tab-bar-item-icon-size` | `22px` | `font-size` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` | `color` |
| `--mp-tab-bar-item-line-height` | `1` | `line-height` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-sys-color-action-primary) 14%, var(--mp-tab-bar-background-color))` | `background-color` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` | `border-radius` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` | `height` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` | `max-width` |
| `--mp-tab-bar-variant-height` | `66px` | `height` |
| `--mp-tab-bar-z-index` | `1` | Component styling |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-tab-bar-background-color: var(--mp-color-bg-2);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
