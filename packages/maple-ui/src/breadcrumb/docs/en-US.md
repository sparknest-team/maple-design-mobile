# Breadcrumb

### Intro

Identify the page location in a hierarchy and navigate upward when needed. The API aligns with Cedar Design Web core features (`routes` / `max-count` / separator slots). Sticky positioning is not included for mobile.

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
      <mp-icon name="menu-right" style="margin: 1px 4px 0" />
    </template>
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 1</mp-breadcrumb-item>
    <mp-breadcrumb-item>Level 2</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### Routes

Pass breadcrumb data via `routes`. Default rendering uses `a[href]`. Customize with `#item-render` or `custom-url`.

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
<template>
  <mp-breadcrumb :max-count="3">
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Sub Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>All Channel</mp-breadcrumb-item>
    <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
    <mp-breadcrumb-item>News</mp-breadcrumb-item>
    <mp-breadcrumb-item>Post</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### Link & Click

Use `href` to render a link. `@click` fires for non-last items.

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
| `max-count` | Max visible count, `0` means unlimited | _number_ | `0` |
| `routes` | Route data (used when default slot is empty) | _BreadcrumbRoute[]_ | `-` |
| `custom-url` | Custom link builder in routes mode | _(paths: string[]) => string_ | `-` |

#### BreadcrumbItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator (overrides parent) | _string \| number_ | `-` |
| `href` | Link URL (not applied on the last item) | _string_ | `-` |

### Events

#### BreadcrumbItem Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Fired on click (not for last / ellipsis item) | `event: Event` |

### Slots

#### BreadcrumbSlots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Breadcrumb items | `-` |
| `separator` | Custom separator | `-` |
| `item-render` | Custom render in routes mode | `route` `routes` `paths` |
| `more-icon` | Custom ellipsis icon | `-` |

#### BreadcrumbItem Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Item content | `-` |
| `separator` | Custom separator (priority over parent) | `-` |

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
