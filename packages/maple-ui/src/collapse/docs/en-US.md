# Collapse

A content area which can be collapsed and expanded. Examples match Cedar Design Web, with a more compact mobile layout.

## Basic examples

### Basic usage

Group and hide complex content. Multiple panels can stay open.

```demo
../example/demos/basic.vue
```

## Appearance and states

### Disabled

Disable a panel with `disabled`.

```demo
../example/demos/disabled.vue
```

## Layout and arrangement

### Nested panels

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | Uncontrolled initial expanded names | Nested panels, Icon position |
| `destroy-on-hide` | Destroy content when hidden | Nested panels |
| `offset` | Gap between expanded panels | Expanded offset |
| `expand-icon-position` | Expand-icon position within the header: left or right, default left. Does not control content expansion direction | Icon position |
| `show-expand-icon` | Whether to show expansion icons; child items decide when omitted | Icon position |
<!-- demo-config-notes:end -->


Panels can be nested.

```demo
../example/demos/nested.vue
```

### Expanded offset

Control the gap between expanded panels with `offset`.

```demo
../example/demos/offset.vue
```

### Icon position

Set `expand-icon-position` to `left` or `right`.

```demo
../example/demos/icon-position.vue
```

## Content and presentation

### Accordion

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | Uncontrolled initial expanded names | Accordion, Borders and dividers, Expand icon |
| `accordion` | Accordion mode; at most one open panel | Accordion |
| `bordered` | Whether to show border | Borders and dividers |
| `divider` | Show dividers | Borders and dividers |
| `destroy-on-hide` | Destroy content when hidden | Destroy on hide |
<!-- demo-config-notes:end -->


Use `accordion` so only one panel is open. `modelValue` remains an array with at most one item.

```demo
../example/demos/accordion.vue
```

### Borders and dividers

Compare outer borders and separators between panels, including their appearance while expanded.

<details>
<summary>Configuration details and limits</summary>

#### Borderless

Hide the border with `bordered="false"`.

#### Divider

Control item dividers with `divider`.

</details>

```demo
../example/demos/border-comparison.vue
```

### Extra

Set extra content with the `extra` slot. Clicking it does not toggle the panel.

```demo
../example/demos/extra.vue
```

### Expand icon

Customize the expand icon. The parent `expand-icon` slot is used by items without their own icon.

```demo
../example/demos/expand-icon.vue
```

### Destroy on hide

Destroy panel content after collapse with `destroy-on-hide`.

```demo
../example/demos/destroy.vue
```

## Customization and slots

### Custom style

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | Uncontrolled initial expanded names | Custom style |
| `bordered` | Whether to show border | Custom style |
<!-- demo-config-notes:end -->


Customize panel styles.

```demo
../example/demos/custom.vue
```

## Interaction and control

### Toggle all

Use `toggleAll` to expand or collapse all panels. It is a no-op in accordion mode.

```demo
../example/demos/toggle-all.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Titles and expanded content inherit reading direction without changing expansion state. The left/right values of expand-icon-position remain physical sides. Custom expansion graphics are not additionally mirrored.

## API

The main value uses ordinary `v-model`: `modelValue` is an array of expanded panel names, including in accordion mode. `defaultValue` initializes uncontrolled state only on creation; later changes do not reset it. Initialization does not emit `update:modelValue`. When `modelValue` is provided, the parent controls the state and its value is authoritative.

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Expanded names; v-model | `(string \| number)[]` | `—` |
| default-value | Uncontrolled initial expanded names | `(string \| number)[]` | `[]` |
| accordion | Accordion mode; at most one open panel | `boolean` | `false` |
| show-expand-icon | Whether to show expansion icons; child items decide when omitted | `boolean` | `—` |
| expand-icon-position | Expand-icon position within the header: left or right, default left. Does not control content expansion direction | `'left' \| 'right'` | `'left'` |
| bordered | Whether to show border | `boolean` | `true` |
| divider | Show dividers | `boolean` | `true` |
| offset | Gap between expanded panels | `boolean` | `false` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | Request an expanded-name update | `(string \| number)[]` |
| change | Emitted when expanded panels change | `(string \| number)[]`, `Event` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | Panel list | `—` |

### Methods

| Method | Description |
| --- | --- |
| toggleAll | Expand or collapse all panels (no-op in accordion) |

<!-- same-source-api:end -->


The parent `expand-icon` slot is forwarded to items that do not provide their own icon. Scope: `expanded`, `disabled`, `position`. It is not rendered on the root node.

#### CollapseToggleAllOptions

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| expand | `'inverse'` toggles all; `boolean` expands or collapses all | `'inverse' \| boolean` | `—` |
| skipDisabled | Skip disabled panels | `boolean` | `false` |

### `<collapse-item>` Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| name **(required)** | Unique panel identifier corresponding to a value in `modelValue` | `string \| number` | `—` |
| title | Panel title | `string` | `—` |
| disabled | Whether disabled | `boolean` | `false` |
| show-expand-icon | Whether to show an expansion icon | `boolean` | `true` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

### `<collapse-item>` Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| title | Panel title | `—` |
| extra | Extra content | `—` |
| expand-icon | Expand icon | expanded: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'` |
| default | Panel content | `—` |

### Type definitions

`Collapse.Item` is the same component as `mp-collapse-item`; `app.use(Collapse)` registers both.

```ts
import type { CollapseInstance, CollapseToggleAllOptions, ExpandIconPosition } from '@maple-design/ui'
```

## Color variables

Collapse public color variables use system semantics consistently in Maple/Cedar:

| Variable | Default semantic value |
| --- | --- |
| `--mp-collapse-border-color` | `--mp-sys-color-border-default` |
| `--mp-collapse-title-bg` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-active` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-disabled` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-title-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-content-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-bg` | `--mp-sys-color-surface-muted` |
| `--mp-collapse-expand-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-collapse-item-border-color` | `--mp-sys-color-border-default` |

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
