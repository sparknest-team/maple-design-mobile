<!-- Source: src/breadcrumb/docs/en-US.md; locale: en-US; page: /en-US/breadcrumb -->

# Breadcrumb

The current page uses primary text color with normal font weight and `aria-current="page"`. Plain text has no interaction feedback. Links, click actions and dropdown triggers use brand color, pointer cursor, hover / pressed feedback and a visible keyboard focus outline. Click actions support Enter and Space. Keep the last item as plain text unless an action is explicitly supplied.

On touch devices, interactive items have a minimum 44 × 44px target. Press feedback clears after release; mouse hover styles do not stick. The default ellipsis is static; use a focusable button in the more-icon slot with a Tooltip to reveal omitted paths.

The default navigation landmark and ellipsis labels follow the current locale. Set aria-label on the root to customize the landmark name.

### Intro

Identify the page location in a hierarchy and navigate upward when needed. The API aligns with Cedar Design Web core features (`routes` / `max-count` / separator slots). Affix positioning is not included for mobile.

## Basic examples

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
    <mp-breadcrumb :routes="routes" @click.prevent @select="handleSelect" />
    <span v-if="selectedPath">Selected: {{ selectedPath }}</span>
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
import { ref } from 'vue'

export default {
  setup() {
    const selectedPath = ref('')
    const handleSelect = (route: { path: string }) => {
      selectedPath.value = route.path
    }
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
    return { routes, droplist, selectedPath, handleSelect }
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
          <mp-button html-type="button" variant="text" class="more-trigger" aria-label="查看隐藏路径">
            <m-icon-more aria-hidden="true" />
          </mp-button>
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

<style scoped>
.more-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
}
</style>
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

## Customization and slots

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
| `--mp-breadcrumb-item-active-color` | `var(--mp-sys-color-action-primary)` | `color` |
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
