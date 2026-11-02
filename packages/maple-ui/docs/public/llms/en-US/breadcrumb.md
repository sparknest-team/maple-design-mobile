<!-- Source: src/breadcrumb/docs/en-US.md; locale: en-US; page: /en-US/breadcrumb -->

# Breadcrumb

The current page uses primary text color with normal font weight and `aria-current="page"`. Plain text has no interaction feedback. Links, click actions and dropdown triggers use brand color, pointer cursor, hover / pressed feedback and a visible keyboard focus outline. Click actions support Enter and Space. Keep the last item as plain text unless an action is explicitly supplied.

On touch devices, interactive items have a minimum 44 × 44px target. Press feedback clears after release; mouse hover styles do not stick. Tap the ellipsis icon to show omitted paths.

## Examples

### Intro

Identify the page location in a hierarchy and navigate upward when needed. The API aligns with Cedar Design Web core features (`routes` / `max-count` / separator slots). Affix positioning is not included for mobile.

### Basic Usage

Example source: src/breadcrumb/example/demos/basic-usage.vue

```vue
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
    <mp-breadcrumb-item>News</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### Custom Separator

Compare the separator slot, parent separator prop and child override. Child settings take precedence.

Example source: src/breadcrumb/example/demos/separator.vue

```vue
<script setup>
import ChildSeparatorDemo from './child-separator.vue'
import SeparatorSlotDemo from './separator-slot.vue'
</script>

<template>
  <mp-space direction="column">
    <SeparatorSlotDemo />
    <mp-breadcrumb separator="~">
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <ChildSeparatorDemo />
  </mp-space>
</template>
```

### Custom Icon

Example source: src/breadcrumb/example/demos/custom-icon.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb>
      <mp-breadcrumb-item>
        <m-icon-home-fill />
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb>
      <mp-breadcrumb-item>
        <m-icon-home-fill />
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>
        <m-icon-link />
        Channel
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
  </mp-space>
</template>
```

### Route Configuration

Pass breadcrumb data via `routes`. Ancestor paths render as native links; the current page remains text. Customize with `#item-render`.

Example source: src/breadcrumb/example/demos/routes-mode.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb :routes="routes" @click.prevent />
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, routes, paths }">
        <span v-if="route === routes[routes.length - 1]">{{ route.label }}</span>
        <mp-link v-else :href="paths.join('/')" @click.prevent>
          {{ route.label }}
        </mp-link>
      </template>
    </mp-breadcrumb>
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, routes }">
        <span v-if="route === routes[routes.length - 1]">{{ route.label }}</span>
        <RouterLink v-else :to="route.to">
          {{ route.label }}
        </RouterLink>
      </template>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  setup() {
    const routes = [
      {
        path: '/',
        to: { query: { breadcrumb: 'home' } },
        label: 'Home',
      },
      {
        path: '/channel',
        to: { query: { breadcrumb: 'channel' } },
        label: 'Channel',
      },
      {
        path: '/news',
        to: { query: { breadcrumb: 'news' } },
        label: 'News',
      },
    ]
    return { routes }
  },
}
</script>
```

### Dropdown

Example source: src/breadcrumb/example/demos/dropdown.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb :routes="routes" @click.prevent />
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item :droplist="droplist"> Channel </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>
        <template #droplist>
          <mp-menu-option>Option 1</mp-menu-option>
          <mp-menu-option>Option 2</mp-menu-option>
          <mp-menu-option>Option 3</mp-menu-option>
        </template>
        Channel
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
export default {
  setup() {
    const routes = [
      {
        path: '/',
        label: 'Home',
      },
      {
        path: '/channel',
        label: 'Channel',
        children: [
          { path: '/goods', label: 'Goods' },
          { path: '/wallet', label: 'Wallet' },
        ],
      },
      {
        path: '/news',
        label: 'News',
      },
    ]
    const droplist = [
      {
        path: '/goods',
        label: 'Goods',
      },
      {
        path: '/wallet',
        label: 'Wallet',
      },
    ]
    return { routes, droplist }
  },
}
</script>
```

### Max Count

Limit visible items with `max-count`. Overflow is collapsed into an ellipsis. Customize with `#more-icon`.

Example source: src/breadcrumb/example/demos/max-count.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb :max-count="3">
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Sub Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>All Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
      <mp-breadcrumb-item>Post</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb :routes="maxRoutes" :max-count="3" @click.prevent>
      <template #more-icon="{ omittedItems }">
        <mp-tooltip :trigger="['hover', 'focus', 'click']" :content="omittedLabel(omittedItems)">
          <m-icon-more />
        </mp-tooltip>
      </template>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import type { BreadcrumbRoute } from '../../types'

const omittedLabel = (items: BreadcrumbRoute[]) => items.map((item) => item.label).join(' / ')

export default {
  setup() {
    const maxRoutes = [
      { path: '/', label: 'Home' },
      { path: '/sub-home', label: 'Sub Home' },
      { path: '/all-channel', label: 'All Channel' },
      { path: '/channel', label: 'Channel' },
      { path: '/news', label: 'News' },
      { path: '/post', label: 'Post' },
    ]
    return { maxRoutes, omittedLabel }
  },
}
</script>
```

### Link & Click

Compare plain text, `href` links and `@click` actions. Activate an item to see the result below. Collapsed items do not emit `click`.

Example source: src/breadcrumb/example/demos/click-event.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const lastAction = ref('尚未操作')
const record = (label: string) => {
  lastAction.value = `已选择 ${label}`
}
</script>

<template>
  <mp-space direction="column">
    <div>纯文本：仅展示路径</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <div>链接：悬停或聚焦查看反馈</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item href="#/home" @click.prevent="record('Home')">Home</mp-breadcrumb-item>
      <mp-breadcrumb-item href="#/channel" @click.prevent="record('Channel')">Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <div>点击操作：支持 Enter / 空格</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item @click="record('Home')">Home</mp-breadcrumb-item>
      <mp-breadcrumb-item @click="record('Channel')">Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <span role="status">{{ lastAction }}</span>
  </mp-space>
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
