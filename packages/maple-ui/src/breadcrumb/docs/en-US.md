# Breadcrumb

The current page uses primary text color with normal font weight and `aria-current="page"`. Plain text has no interaction feedback. Links, click actions and dropdown triggers use brand color, pointer cursor, hover / pressed feedback and a visible keyboard focus outline. Click actions support Enter and Space. Keep the last item as plain text unless an action is explicitly supplied.

On touch devices, interactive items have a minimum 44 × 44px target. Press feedback clears after release; mouse hover styles do not stick. The default ellipsis is static; use a focusable button in the more-icon slot with a Tooltip to reveal omitted paths.

The default navigation landmark and ellipsis labels follow the current locale. Set aria-label on the root to customize the landmark name.

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

For routes with children, the parent remains a link and a separate button opens the menu. Selecting a child emits select(route, event) from the root; the application decides whether to navigate. Listen on individual manually composed BreadcrumbItem components for their select events.

## API

### Breadcrumb Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Range separator | _string \| number_ | `/` |
| `max-count` | Max visible normal items, excluding more; `0` means unlimited | _number_ | `0` |
| `routes` | Route data (used when default slot is empty) | _BreadcrumbRoute[]_ | `-` |

### Breadcrumb Events

| Event | Description | Arguments |
| --- | --- | --- |
| select | Emitted when a built-in dropdown child is selected in routes mode | `route: BreadcrumbRoute, event?: Event` |

The `more-icon` slot receives omitted route data only in routes mode. With manually composed default-slot items, omittedItems is empty; count, start and end still describe the omitted range.

### BreadcrumbItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator; overrides parent | _string \| number_ | `-` |
| `href` | Link URL | _string_ | `-` |
| `droplist` | Dropdown menu content | _BreadcrumbRoute['children']_ | `-` |
| `dropdown-props` | Menu props; open, onUpdate:open and onSelect are managed by the component | _MenuProps_ | `-` |

### BreadcrumbItem Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Fired on click (not for collapsed item) | `event: MouseEvent` |
| `select` | Fired when a built-in dropdown item is selected | `route: BreadcrumbRoute, event?: Event` |

### BreadcrumbItem Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Breadcrumb content | `-` |
| `separator` | Custom separator; overrides parent | `-` |
| `droplist` | Custom dropdown menu | `-` |

### Breadcrumb Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Breadcrumb children | `-` |
| `separator` | Custom separator | `-` |
| `item-render` | Custom render in `routes` mode | `route` `routes` `paths` |
| `more-icon` | Custom ellipsis icon | `omittedItems` `count` `start` `end` |

## Types

```ts
interface BreadcrumbRoute {
  label: string
  path: string
  children?: BreadcrumbRoute[]
}
```

## Usage notes



- A nonempty `routes` array takes precedence over the default slot; an empty array falls back to the slot. Default route rendering links all items except the last, which has `aria-current="page"`. `item-render` controls links itself.
- Separator precedence: child slot → child prop → parent slot → parent prop. `0` and an empty string are supported.
- `max-count` is a nonnegative integer; 0 means unlimited. A value of 1 acts as 2 to preserve the first and current items. Positive fractions are rounded down and clamped to at least 2; negative or nonfinite values act as 0. Invalid values produce a development warning. Collapsing occurs only when the total exceeds the effective count plus 1; the overflow position does not trigger omitted items’ clicks, links or dropdowns.
- Built-in dropdown selection emits `select(route, event)`. Indices and separators update with dynamic insertion, removal, reordering and SSR.
- Custom attributes apply to the breadcrumb item content node.

## CSS Variables

Customize these CSS variables through [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-breadcrumb-bg` | `transparent` | `background-color` |
| `--mp-breadcrumb-bg-hover` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-breadcrumb-dropdown-icon` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-font-weight-active` | `400` | `font-weight` |
| `--mp-breadcrumb-icon-color` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-item-active-color` | `rgb(var(--mp-primary-8))` | `color` |
| `--mp-breadcrumb-item-inactive-color` | `var(--mp-color-text-2)` | `color` |
| `--mp-breadcrumb-item-separator-font-size` | `14px` | `font-size` |
| `--mp-breadcrumb-item-separator-margin` | `0 var(--mp-breadcrumb-margin-separator-horizontal)` | `margin` |
| `--mp-breadcrumb-link-text-color` | `var(--mp-breadcrumb-item-active-color)` | `color` |
| `--mp-breadcrumb-link-text-color-hover` | `rgb(var(--mp-primary-9))` | `color` |
| `--mp-breadcrumb-margin-dropdown-icon-left` | `4px` | `margin-inline-start` |
| `--mp-breadcrumb-margin-separator-horizontal` | `10px` | `margin` |
| `--mp-breadcrumb-padding-text-horizontal` | `0px` | `margin`, `padding` |
| `--mp-breadcrumb-separator-color` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-separator-font-size` | `var(--mp-breadcrumb-item-separator-font-size)` | `font-size` |
| `--mp-breadcrumb-separator-margin` | `var(--mp-breadcrumb-item-separator-margin)` | `margin` |
| `--mp-breadcrumb-size-dropdown-icon` | `12px` | `font-size` |
| `--mp-breadcrumb-size-font-size` | `14px` | `font-size` |
| `--mp-breadcrumb-size-text-height` | `24px` | `line-height` |
| `--mp-breadcrumb-text-border-radius-hover` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-breadcrumb-text-color` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-text-color-active` | `var(--mp-color-text-1)` | `color` |
| `--mp-breadcrumb-touch-target-size` | `44px` | `min-height`, `min-width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-breadcrumb-icon-color: var(--mp-breadcrumb-item-inactive-color);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
