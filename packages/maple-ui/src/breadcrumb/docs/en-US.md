# Breadcrumb

The current page uses primary text color with normal font weight and `aria-current="page"`. Plain text has no interaction feedback. Links, click actions and dropdown triggers use brand color, pointer cursor, hover / pressed feedback and a visible keyboard focus outline. Click actions support Enter and Space. Keep the last item as plain text unless an action is explicitly supplied.

On touch devices, interactive items have a minimum 44 × 44px target. Press feedback clears after release; mouse hover styles do not stick. Tap the ellipsis icon to show omitted paths.

## Examples

### Intro

Identify the page location in a hierarchy and navigate upward when needed. The API aligns with Cedar Design Web core features (`routes` / `max-count` / separator slots). Affix positioning is not included for mobile.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Custom Separator

Compare the separator slot, parent separator prop and child override. Child settings take precedence.

```demo
../example/demos/separator.vue
```

### Custom Icon

```demo
../example/demos/custom-icon.vue
```

### Route Configuration

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

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

#### Breadcrumb Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator | _string \| number_ | `/` |
| `max-count` | Max visible normal items, excluding more; `0` means unlimited | _number_ | `0` |
| `routes` | Route data (used when default slot is empty) | _BreadcrumbRoute[]_ | `-` |

#### BreadcrumbItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator (overrides parent) | _string \| number_ | `-` |
| `href` | Link URL | _string_ | `-` |
| `droplist` | Dropdown menu items | _BreadcrumbRoute['children']_ | `-` |
| `dropdown-props` | Props passed to Menu | _MenuProps_ | `-` |

### Events

#### BreadcrumbItem Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Fired on click (not for collapsed item) | `event: MouseEvent` |
| `select` | Fired when a built-in dropdown item is selected | `route: BreadcrumbRoute` |

### Slots

#### BreadcrumbSlots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Breadcrumb items | `-` |
| `separator` | Custom separator | `-` |
| `item-render` | Custom render in routes mode | `route` `routes` `paths` |
| `more-icon` | Custom ellipsis icon | `omittedItems` `count` `start` `end` |

#### BreadcrumbItem Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Item content | `-` |
| `separator` | Custom separator (priority over parent) | `-` |
| `droplist` | Custom dropdown menu | `-` |

### Type Definitions

```ts
interface BreadcrumbRoute {
  label: string
  path: string
  children?: { label: string; path: string }[]
}
```

### Style Variables

Customize via [StyleProvider](#/en-US/style-provider).

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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator (overrides parent) | _string \| number_ | `-` |
| `href` | Link URL | _string_ | `-` |
| `droplist` | Dropdown items | _BreadcrumbRoute[]_ | `-` |
| `dropdown-props` | Props passed to Menu | _MenuProps_ | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Fired on click (not for collapsed item) | `event: MouseEvent` |
| `select` | Fired when a built-in dropdown item is selected | `route: BreadcrumbRoute` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Item content |
| `separator` | Custom separator |
| `droplist` | Custom dropdown menu |

## Same-source implementation

Breadcrumb and BreadcrumbItem are maintained as independent source copies in Cedar and Maple. Non-empty routes take precedence over the default slot; empty routes fall back to slot items. Item separator slot/prop overrides the parent separator slot/prop. Collapsed items cannot activate their original link or dropdown. The select event provides `(route, event)`. Icons, Menu, installation and theme tokens remain local.

An SVG icon can be used directly as the Tooltip trigger element. Use `trigger="click"` for touch interaction.
