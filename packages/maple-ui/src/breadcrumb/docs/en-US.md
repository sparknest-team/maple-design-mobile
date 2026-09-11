# Breadcrumb

### Intro

Identify the page location in a hierarchy and navigate upward when needed. The API aligns with Cedar Design Web core features (`routes` / `max-count` / separator slots). Affix positioning is not included for mobile.

### Basic Usage

```html
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 1</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 2</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### Separator

Customize separator via parent/child `separator` prop or `#separator` slot. Child takes precedence.

```html
<template>
  <mp-breadcrumb separator="\">
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 2</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 3</mp-breadcrumb-item>
  </mp-breadcrumb>

  <mp-breadcrumb>
    <template #separator>
      <m-icon-menu-right style="margin: 1px 4px 0" />
    </template>
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 1</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 2</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### Routes

Pass breadcrumb data via `routes`. Each item's `path` is used as its native `href`. Customize with `#item-render`.

```html
<script setup>
const routes = [
  { path: '/', label: 'Home' },
  { path: '/channel', label: 'Channel' },
  { path: '/news', label: 'News' },
]
</script>

<template>
  <mp-breadcrumb :routes="routes" />
</template>
```

### Max Count

Limit visible items with `max-count`. Overflow is collapsed into an ellipsis. Customize with `#more-icon`.

```html
<script setup>
const maxRoutes = [
  { path: '/', label: 'Home' },
  { path: '/sub-home', label: 'Sub Home' },
  { path: '/all-channel', label: 'All Channel' },
  { path: '/channel', label: 'Channel' },
  { path: '/news', label: 'News' },
  { path: '/post', label: 'Post' },
]
</script>

<template>
  <mp-breadcrumb :max-count="3">
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Sub Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>All Channel</mp-breadcrumb-item>
    <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
    <mp-breadcrumb-item>News</mp-breadcrumb-item>
    <mp-breadcrumb-item>Post</mp-breadcrumb-item>
  </mp-breadcrumb>

  <mp-breadcrumb :routes="maxRoutes" :max-count="3">
    <template #more-icon="{ omittedItems }">
      <mp-tooltip :content="omittedItems.map((item) => item.label).join(' / ')">
        <m-icon-more />
      </mp-tooltip>
    </template>
  </mp-breadcrumb>
</template>
```

### Link & Click

Use `href` to render a link. `@click` does not fire for collapsed items.

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item href="#/home" @click="Message('Home')">Home</mp-breadcrumb-item>
    <mp-breadcrumb-item href="#/list" @click="Message('List')">List</mp-breadcrumb-item>
    <mp-breadcrumb-item>Detail</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

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
| `dropdown-props` | Props passed to DropdownMenu | _DropdownMenuProps_ | `-` |

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
| `--mp-breadcrumb-item-active-color` | `var(--mp-color-primary)` |
| `--mp-breadcrumb-item-inactive-color` | `#888` |
| `--mp-breadcrumb-item-separator-margin` | `0 10px` |
| `--mp-breadcrumb-item-separator-font-size` | `14px` |

# BreadcrumbItem Docs

See [Breadcrumb](#/en-US/breadcrumb).

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator (overrides parent) | _string \| number_ | `-` |
| `href` | Link URL | _string_ | `-` |
| `droplist` | Dropdown items | _BreadcrumbRoute[]_ | `-` |
| `dropdown-props` | Props passed to DropdownMenu | _DropdownMenuProps_ | `-` |

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
