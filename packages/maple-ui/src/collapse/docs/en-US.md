# Collapse

A content area which can be collapsed and expanded. Examples match Cedar Design Web, with a more compact mobile layout.

## Examples

### Basic usage

Group and hide complex content. Multiple panels can stay open.

```demo
../example/demos/basic.vue
```

### Accordion

Use `accordion` so only one panel is open. `activeNames` remains an array with at most one item.

```demo
../example/demos/accordion.vue
```

### Disabled

Disable a panel with `disabled`.

```demo
../example/demos/disabled.vue
```

### Nested panels

Panels can be nested.

```demo
../example/demos/nested.vue
```

### Borderless

Hide the border with `bordered="false"`.

```demo
../example/demos/border-less.vue
```

### Divider

Control item dividers with `divider`.

```demo
../example/demos/divider.vue
```

### Expanded offset

Control the gap between expanded panels with `offset`.

```demo
../example/demos/offset.vue
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

### Custom style

Customize panel styles.

```demo
../example/demos/custom.vue
```

### Icon position

Set `expand-icon-position` to `left` or `right`.

```demo
../example/demos/icon-position.vue
```

### Destroy on hide

Destroy panel content after collapse with `destroy-on-hide`.

```demo
../example/demos/destroy.vue
```

### Toggle all

Use `toggleAll` to expand or collapse all panels. It is a no-op in accordion mode.

```demo
../example/demos/toggle-all.vue
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| active-names | Expanded names; v-model:active-names | `(string \| number)[]` | `—` |
| default-active-names | Uncontrolled initial expanded names | `(string \| number)[]` | `[]` |
| accordion | Accordion mode; at most one open panel | `boolean` | `false` |
| show-expand-icon | Show expand icons; unset defers to the item | `boolean` | `—` |
| expand-icon-position | Expand icon position | `'left' \| 'right'` | `'left'` |
| bordered | Show border | `boolean` | `true` |
| divider | Show dividers | `boolean` | `true` |
| offset | Gap between expanded panels | `boolean` | `false` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:active-names | Request an expanded-name update | `(string \| number)[]` |
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

The parent `expand-icon` slot is forwarded to items that do not provide their own icon. Scope: `active`, `disabled`, `position`. It is not rendered on the root node.

#### CollapseToggleAllOptions

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| expand | `'inverse'` toggles all; `boolean` expands or collapses all | `'inverse' \| boolean` | `—` |
| skipDisabled | Skip disabled panels | `boolean` | `false` |

### `<collapse-item>` Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| name **(required)** | Unique name, corresponding to `activeNames` | `string \| number` | `—` |
| title | Panel title | `string` | `—` |
| disabled | Disable the panel | `boolean` | `false` |
| show-expand-icon | Whether to show the expand icon | `boolean` | `true` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

### `<collapse-item>` Slots

| Slot | Description | Scope |
| --- | --- | --- |
| title | Panel title | `—` |
| extra | Extra content | `—` |
| expand-icon | Expand icon | active: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'` |
| default | Panel content | `—` |

### Types

`Collapse.Item` is the same component as `mp-collapse-item`; `app.use(Collapse)` registers both.

```ts
import type { CollapseInstance, CollapseToggleAllOptions, ExpandIconPosition } from '@maplejs/maple-ui'
```

## Color variables

Public Collapse color variables use system semantics by default and stay aligned with Cedar:

| Variable | Default semantic role |
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

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.
