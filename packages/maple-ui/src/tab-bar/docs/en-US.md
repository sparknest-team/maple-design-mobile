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

External loading blocks close/switch requests; internal before-hook waiting is merged for display.


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

```demo
../example/demos/loading.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Items follow reading direction without changing their values or data order. Implicit floating-action spacing follows reading end; centered actions stay centered. Explicitly named badge positions remain physical corners.

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is the selected child name; unnamed positional mode uses zero-based indices. `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins, without initialization `update:modelValue`.

### Props

#### TabBar Props

| Arguments | Description | Type | Default |
| ------------------ | ----------------- | ---- | ---- |
| `v-model` | Selected name or index; controlled when provided | _number \| string_ | `undefined` |
| `default-value` | Initial uncontrolled selection; read once | _number \| string_ | `0` |
| `before-change` | Guard selection; truthy permits, falsy/throw/rejection cancels. Only the latest request may commit | _(active: number \| string) => boolean \| Promise&lt;boolean&gt;_ | `-` |
| `fixed` | Whether to fixed bottom | _boolean_ | `false` |
| `border` | Whether to show border | _boolean_ | `false` |
| `safe-area` | Whether to enable bottom safety zone adaptation | _boolean_ | `false` |
| `z-index` | Z-index; an explicit prop overrides the CSS variable | _number \| string_ | `undefined`; CSS defaults to `1` |
| `active-color` | Color of active tab item | _string_ | `-` |
| `inactive-color` | Color of inactive tab item | _string_ | `-` |
| `placeholder`  ***3.2.11*** | Whether to generate placeholder elements of the same height at the bottom (`fixed` required) | _boolean_ | `false` |
| `fab-props` | Fab button props | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` | Appearance | _TabBarVariant_：`standard` / `pill` | `standard` |

Without active, selection is managed internally. Providing active only notifies callers. Removing active resumes from the last controlled value. Numeric names take precedence over unnamed indices; named children do not match by index.

#### TabBarItem Props

| Arguments | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, matching Icon [name](#/en-US/icon) | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

#### TabBar Events

| Event | Description | Callback arguments |
| ---- | ---- | ---- |
| `change` | Triggered when switching labels | `active: number \| string` |
| `fab-click` | Triggered when clicking fab button | `-` |

#### TabBarItem Events

| Event | Description | Callback arguments |
| ---- | ---- | ---- |
| `click` | Triggered when the cell is clicked | `active: number \| string` |

### Slots

#### TabBar Slots

| Name | Description | Arguments |
| ---- | ----------------------- | ---- |
| `default` | Bottom-navigation content | `-` |
| `fab` | Support for inserting a custom Fab button into a component | `-` |

#### TabBarItem Slots

| Name | Description | Arguments |
| ---- | ---- | ---- |
| `default` | Custom `label` content; overrides `label` | `active: boolean` |
| `icon` | Custom icon | `active: boolean` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

#### TabBar Variables

When `z-index` is omitted, the component consumes `--mp-tab-bar-z-index`. An explicit number or CSS string takes precedence. The visual default remains `1`; the prop itself no longer defaults to `1`.

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-height` | `50px` |
| `--mp-tab-bar-variant-height` | `66px` |
| `--mp-tab-bar-z-index` | `1` |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` |
| `--mp-tab-bar-border-color` | `var(--color-border-2)` |
| `--mp-tab-bar-fab-offset` | `4px` |

#### TabBarItem Variables

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-item-font-size` | `var(--font-size-sm)` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-tab-bar-item-active-color` | `var(--color-primary)` |
| `--mp-tab-bar-item-active-background-color` | `transparent` |
| `--mp-tab-bar-item-line-height` | `1` |
| `--mp-tab-bar-item-icon-size` | `22px` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` |
| `--mp-tab-bar-fab-border-radius` | `50%` ` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-color-primary)` |

`default`/`icon` slot active indicates whether this item's name matches modelValue; focus/hover do not change it. activeColor/inactiveColor control current/noncurrent colors.

### Before-hook waiting feedback

Before-hook waits show visible feedback and aria-busy. Rejected or failed operations recover; duplicate submissions do not start another copy. Notification event Promises never drive loading. Different tab targets keep the latest request.

### guard-error

Emitted once with `(error, value)` after a change hook fails.
