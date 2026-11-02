# Breadcrumb

The current page uses primary text color with normal font weight and `aria-current="page"`. Plain text has no interaction feedback. Links, click actions and dropdown triggers use brand color, pointer cursor, hover / pressed feedback and a visible keyboard focus outline. Click actions support Enter and Space. Keep the last item as plain text unless an action is explicitly supplied.

On touch devices, interactive items have a minimum 44 × 44px target. Press feedback clears after release; mouse hover styles do not stick. Tap the ellipsis icon to show omitted paths.

### Intro

Identify the page location in a hierarchy and navigate upward when needed. The API aligns with Cedar Design Web core features (`routes` / `max-count` / separator slots). Affix positioning is not included for mobile.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Route Configuration

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `routes` | Route data (used when default slot is empty) | Route Configuration, Dropdown, Max Count |
| `max-count` | Max visible normal items, excluding more; `0` means unlimited | Max Count |
<!-- demo-config-notes:end -->


Pass breadcrumb data via `routes`. Ancestor paths render as native links; the current page remains text. Customize with `#item-render`.

```demo
../example/demos/routes-mode.vue
```

### Dropdown

```demo
../example/demos/dropdown.vue
```

### Max Count

Limit visible items with `max-count`. Overflow is collapsed into an ellipsis. Customize with `#more-icon`.

```demo
../example/demos/max-count.vue
```

### Link & Click

Compare plain text, `href` links and `@click` actions. Activate an item to see the result below. Collapsed items do not emit `click`.

```demo
../example/demos/click-event.vue
```

## Customization and slots

### Custom Separator

Compare the separator slot, parent separator prop and child override. Child settings take precedence.

```demo
../example/demos/separator.vue
```

### Custom Icon

```demo
../example/demos/custom-icon.vue
```

## API

### Props

#### Breadcrumb Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Range separator | _string \| number_ | `/` |
| `max-count` | Max visible normal items, excluding more; `0` means unlimited | _number_ | `0` |
| `routes` | Route data (used when default slot is empty) | _BreadcrumbRoute[]_ | `-` |

#### BreadcrumbItem Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator; overrides parent | _string \| number_ | `-` |
| `href` | Link URL | _string_ | `-` |
| `droplist` | Dropdown menu content | _BreadcrumbRoute['children']_ | `-` |
| `dropdown-props` | Props passed to Menu | _MenuProps_ | `-` |

### Events

#### BreadcrumbItem Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Fired on click (not for collapsed item) | `event: MouseEvent` |
| `select` | Fired when a built-in dropdown item is selected | `route: BreadcrumbRoute, event?: Event` |

### Slots

#### Breadcrumb Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Breadcrumb children | `-` |
| `separator` | Custom separator | `-` |
| `item-render` | Custom render in `routes` mode | `route` `routes` `paths` |
| `more-icon` | Custom ellipsis icon | `omittedItems` `count` `start` `end` |

#### BreadcrumbItem Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Breadcrumb content | `-` |
| `separator` | Custom separator; overrides parent | `-` |
| `droplist` | Custom dropdown menu | `-` |

### Type definitions

```ts
interface BreadcrumbRoute {
  label: string
  path: string
  children?: BreadcrumbRoute[]
}
```

### Style variables

Customize these CSS variables through [StyleProvider](#/en-US/style-provider).

#### BreadcrumbItem Variables

| Variable | Default |
| --- | --- |
| `--mp-breadcrumb-item-active-color` | `rgb(var(--mp-primary-8))` |
| `--mp-breadcrumb-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-breadcrumb-item-separator-margin` | `0 10px` |
| `--mp-breadcrumb-item-separator-font-size` | `14px` |
| `--mp-breadcrumb-touch-target-size` | `44px` |

## BreadcrumbItem

See [Breadcrumb](#/en-US/breadcrumb).

### API

### Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator; overrides parent | _string \| number_ | `-` |
| `href` | Link URL | _string_ | `-` |
| `droplist` | Dropdown menu content | _BreadcrumbRoute[]_ | `-` |
| `dropdown-props` | Props passed to Menu | _MenuProps_ | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Fired on click (not for collapsed item) | `event: MouseEvent` |
| `select` | Fired when a built-in dropdown item is selected | `route: BreadcrumbRoute, event?: Event` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Breadcrumb content |
| `separator` | Custom separator |
| `droplist` | Custom dropdown menu |


## Shared implementation and platform boundaries

Breadcrumb and BreadcrumbItem are maintained as local copies in Cedar / Maple. Component bodies, props, context, types, key styles and paired tests are checked by `design-ui/bin/copied-components-check.mjs`. Each library supplies its own icons, installation entry, menu implementation and theme tokens.

- A nonempty `routes` array takes precedence over the default slot; an empty array falls back to the slot. Default route rendering links all items except the last, which has `aria-current="page"`. `item-render` controls links itself.
- Separator precedence: child slot → child prop → parent slot → parent prop. `0` and an empty string are supported.
- `max-count` preserves the existing boundary: collapsing occurs only when the total exceeds `max-count + 1`. It keeps the first and trailing items. The overflow position does not trigger omitted items’ clicks, links or dropdowns.
- Built-in dropdown selection emits `select(route, event)`. Indices and separators update with dynamic insertion, removal, reordering and SSR.
- Cedar adds a `__content` wrapper for item content; attributes fall through to it. Maple retains its existing theme variables through token mappings.
