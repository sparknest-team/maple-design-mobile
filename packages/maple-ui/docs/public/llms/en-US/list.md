<!-- Source: src/list/docs/en-US.md; locale: en-US; page: /en-US/list -->

# List

Current-source revalidation,2026-10-16:15 lifecycle/two measurement cases pass with measured-row/self-scroll alignment and reactive padding;related List total38. Pre/post hashes match;only classification is updated,not parallel product code. These controls do not certify arbitrary destructive geometry reentry,native smooth scrolling,trusted input or OS. Earlier counts remain historical.

VirtualList lifecycle audit: superseded requests, changed data, deactivation and disposal invalidate old nextTick corrections; retained inactive/disposed commands are inert and activation does not replay old work. Corrections are not RAF interpolation and introduce no CSS token/API. All15 scoped cases per copy pass; full List Cedar41/Maple34. New real browser cases:0. Existing key/index/align and measurement contracts remain. The classification note below is historical.

Example source: src/list/example/demos/en-US/virtual-lifecycle.vue

```vue
<script setup>
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const rows = Array.from({ length: 100 }, (_, key) => ({ key }))
let retained
const capture = (instance) => {
  if (instance) {
    retained = instance
  }
}
const jump = () => retained?.scrollIntoView({ key: 50, align: 'top' })
</script>

<template>
  <div>
    <mp-button @click="active = !active">Activate / deactivate</mp-button>
    <mp-button @click="mounted = !mounted">Mount / dispose cache</mp-button>
    <mp-button @click="jump">Retained command: row 51</mp-button>
    <p>Inactive/disposed commands do nothing. Activation never replays them.</p>
    <KeepAlive v-if="mounted">
      <mp-list
        v-if="active"
        :ref="capture"
        :data="rows"
        :virtual-list-props="{ height: 100, fixedSize: true, estimatedSize: 20, buffer: 2, itemKey: 'key' }"
      >
        <template #item="{ item }"
          ><div style="height: 20px">{{ item.key + 1 }}</div></template
        >
      </mp-list>
    </KeepAlive>
  </div>
</template>
```

`scrollIntoView` forwards options to the internal VirtualList `scrollTo` only in virtual mode; it is not a direct native DOM scrollIntoView or a local motion timer. Native scrolling, preferences and retained-command lifecycle require a separate VirtualList consumer audit. Source hints are not visual acceptance; this classification changes no List API/implementation.

A presentational list. Compose it with `InfiniteScroll` for pagination.


## 案例

### basic usage

Example source: src/list/example/demos/basic-usage.vue

```vue
<script setup>
const items = [
  { name: 'Alice', value: '138 0000 0001' },
  { name: 'Bob', value: '138 0000 0002' },
  { name: 'Carol', value: '138 0000 0003' },
]
</script>

<template>
  <mp-list :data="items" bordered>
    <template #header>联系人</template>
    <template #item="{ item, index }">
      <mp-list-item>
        <template #prefix>{{ index + 1 }}</template>
        {{ item.name }}
        <template #suffix>{{ item.value }}</template>
      </mp-list-item>
    </template>
    <template #footer>{{ items.length }} 项</template>
  </mp-list>
</template>
```

### manual usage

Example source: src/list/example/demos/manual-usage.vue

```vue
<script setup>
const items = [
  { name: 'Alice', value: '138 0000 0001' },
  { name: 'Bob', value: '138 0000 0002' },
  { name: 'Carol', value: '138 0000 0003' },
]
</script>

<template>
  <mp-list size="lg">
    <mp-list-item v-for="item in items" :key="item.name">{{ item.name }}</mp-list-item>
  </mp-list>
</template>
```

### states

Example source: src/list/example/demos/states.vue

```vue
<script setup></script>

<template>
  <mp-list :data="[]" loading />
  <mp-list :data="[]" style="margin-top: 12px">
    <template #empty>暂无联系人</template>
  </mp-list>
</template>
```

## Basic Usage

```html
<mp-list :data="items" size="md" bordered>
  <template #header>Contacts</template>
  <template #item="{ item, index }">
    <mp-list-item>
      <template #prefix>{{ index + 1 }}</template>
      {{ item.name }}
      <template #suffix>{{ item.phone }}</template>
    </mp-list-item>
  </template>
  <template #empty>No contacts</template>
  <template #footer>{{ items.length }} items</template>
</mp-list>
```

You can also provide list content directly. When both the default slot and `data` are present, the default slot wins and `item` is not invoked.

```html
<mp-list :data="items">
  <mp-list-item>Default slot content</mp-list-item>
  <template #item="{ item }">{{ item }}</template>
</mp-list>
```

`loading` represents an initial full-list load or refresh, not next-page loading. An empty list does not render its empty state while loading.

### Bounded scrolling

Example source: src/list/example/demos/en-US/bounded-scroll.vue

```vue
<script setup>
const rows = Array.from({ length: 20 }, (_, index) => ({ id: index, name: 'Row ' + (index + 1) }))
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-list :data="rows" :max-height="180" :scrollbar="false">
      <template #header>Native scrollbar</template>
      <template #item="{ item }"
        ><mp-list-item>{{ item.name }}</mp-list-item></template
      >
    </mp-list>
    <mp-list :data="rows" max-height="12rem" :scrollbar="{ type: 'track' }" size="sm" :split="false">
      <template #header>Custom scrollbar without separators</template>
      <template #item="{ item }"
        ><mp-list-item>{{ item.name }}</mp-list-item></template
      >
    </mp-list>
  </mp-space>
</template>
```

### Virtual navigation

The demo uses `Space direction="column"` to place controls above a full-width list. `estimatedSize` estimates unmeasured rows; application rows do not need a fixed height.

Navigation uses rendered row bounds when available and updates virtual padding after measurement. Programmatic scroll events preserve the current alignment while rendering rows; a different native scroll position, a new command, data replacement, deactivation or disposal cancels its deferred correction. `auto` leaves a fully visible row and the rendered window unchanged. This does not promise continuous tracking of arbitrary asynchronous row resizing.

Example source: src/list/example/demos/en-US/virtual-navigation.vue

```vue
<script setup>
import { ref } from 'vue'

const list = ref()
const rows = Array.from({ length: 1000 }, (_, id) => ({ id, name: 'Row ' + (id + 1) }))
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space wrap>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'top' })">Row 500 at top</mp-button>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'bottom' })">Row 500 at bottom</mp-button>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'auto' })">Scroll only if needed</mp-button>
    </mp-space>
    <mp-list
      ref="list"
      :data="rows"
      :virtual-list-props="{ height: 240, itemKey: 'id', estimatedSize: 48, buffer: 10 }"
    >
      <template #item="{ item, index }"
        ><mp-list-item
          ><template #prefix>{{ index + 1 }}</template
          >{{ item.name }}</mp-list-item
        ></template
      >
    </mp-list>
  </mp-space>
</template>
```

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| data | Data consumed by item slot | unknown[] | undefined |
| size | Implemented sizes only; xs/xl are not supported | 'sm' \| 'md' \| 'lg' | md |
| bordered | Outer border | boolean | true |
| split | Item/header/footer separators, independent of border | boolean | true |
| loading | Initial loading/refresh feedback, not pagination state | boolean | false |
| max-height | Maximum ordinary viewport height; number in px or CSS length, zero means unlimited | number \| string | 0 |
| virtual-list-props | Data virtualization; ignored when default slot exists | ListVirtualListProps | undefined |
| scrollbar | Ordinary viewport custom scrollbar; false uses native scrolling | boolean \| ListScrollbarProps | true |

Virtual mode owns its scroll viewport and does not nest a custom scrollbar. virtualListProps.height takes precedence over maxHeight; otherwise the virtual height defaults to 200px. Invalid or non-positive max-height values leave height unlimited.

ListVirtualListProps includes height, threshold, fixedSize, estimatedSize, buffer, itemKey and component. Data is supplied by List.data; the deprecated isStaticItemHeight field is not supported. All rows render when the data length is at or below threshold. Dynamic rows use measured heights with estimatedSize as fallback; buffer controls prerendered rows.

ListScrollbarProps includes type: 'track'|'embed', outerClass, outerStyle, hide, disableHorizontal and disableVertical. Object fields use camelCase.

### Events and methods

- scroll(event: Event): one notification for each actual scroll event.
- scrollIntoView({ index?, key?, align }): virtual item navigation, index takes precedence; align is top/bottom/auto. Auto retains the position of a fully visible item and otherwise moves enough to reveal it. Invalid targets and non-virtual lists do nothing.

### Slots and types

List slots: default (takes precedence over data and disables virtualization), item({ item, index }), header, footer, empty. Empty is displayed only without default content/data and while not loading.

ListItem slots: prefix, default, suffix. Items preserve listitem semantics; business interactions remain in slots.

Types: ListProps, ListSize, ListVirtualListProps, ListScrollbarProps, ListExpose, ListSlots, ListEmits, ListInstance, ListItemInstance.

List displays content; compose InfiniteScroll for pagination instead of duplicating its loading state machine inside List.

## Style tokens

| Token | Default |
| --- | --- |
| `--mp-list-background` | `var(--mp-color-bg-1)` |
| `--mp-list-empty-padding` | `24px 16px` |
| `--mp-list-empty-color` | `var(--mp-color-text-3)` |
| `--mp-list-loading-padding` | `16px` |
| `--mp-list-border-width` | `1px` |
| `--mp-list-border-color` | `var(--mp-color-border-2)` |
| `--mp-list-border-radius` | `4px` |
| `--mp-list-text-color` | `var(--mp-color-text-1)` |
| `--mp-list-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-list-line-height` | `1.5` |
| `--mp-list-text-color-header` | `var(--mp-color-text-1)` |
| `--mp-list-font-size-header` | `var(--mp-sys-font-size-md)` |
| `--mp-list-font-weight-header` | `500` |
| `--mp-list-line-height-header` | `1.5` |
| `--mp-list-item-prefix-margin-right` | `12px` |
| `--mp-list-item-suffix-margin-left` | `12px` |
| `--mp-list-size-sm-padding-vertical-header` | `12px` |
| `--mp-list-size-sm-padding-horizontal-header` | `16px` |
| `--mp-list-size-sm-padding-vertical-footer` | `12px` |
| `--mp-list-size-sm-padding-horizontal-footer` | `16px` |
| `--mp-list-size-sm-padding-vertical-item` | `8px` |
| `--mp-list-size-sm-padding-horizontal-item` | `12px` |
| `--mp-list-size-md-padding-vertical-header` | `12px` |
| `--mp-list-size-md-padding-horizontal-header` | `16px` |
| `--mp-list-size-md-padding-vertical-footer` | `12px` |
| `--mp-list-size-md-padding-horizontal-footer` | `16px` |
| `--mp-list-size-md-padding-vertical-item` | `12px` |
| `--mp-list-size-md-padding-horizontal-item` | `16px` |
| `--mp-list-size-lg-padding-vertical-header` | `12px` |
| `--mp-list-size-lg-padding-horizontal-header` | `16px` |
| `--mp-list-size-lg-padding-vertical-footer` | `12px` |
| `--mp-list-size-lg-padding-horizontal-footer` | `16px` |
| `--mp-list-size-lg-padding-vertical-item` | `16px` |
| `--mp-list-size-lg-padding-horizontal-item` | `20px` |
