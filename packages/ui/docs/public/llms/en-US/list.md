<!-- Source: src/list/docs/en-US.md; locale: en-US; page: /en-US/list -->

# List

A presentational list. Compose it with `InfiniteScroll` for pagination.

## Basic examples

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

## Appearance and states

### states

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `data` | Data consumed by item slot | states |
| `loading` | Initial loading/refresh feedback, not pagination state | states |
<!-- demo-config-notes:end -->


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

## Scrolling and virtualization

### Bounded scrolling

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `data` | Data consumed by item slot | Bounded scrolling, Virtual navigation |
| `size` | Implemented sizes only; xs/xl are not supported | Bounded scrolling, manual usage |
| `max-height` | Maximum ordinary viewport height; number in px or CSS length, zero means unlimited | Bounded scrolling |
| `scrollbar` | Ordinary viewport custom scrollbar; false uses native scrolling | Bounded scrolling |
| `split` | Item/header/footer separators, independent of border | Bounded scrolling |
| `virtual-list-props` | Data virtualization; ignored when default slot exists | Virtual navigation |
<!-- demo-config-notes:end -->


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

Navigation uses rendered row bounds when available and updates virtual padding after measurement. Programmatic scroll events preserve the current alignment while rendering rows; a different native scroll position, a new command, data replacement, deactivation or disposal cancels its deferred correction. `auto` leaves a fully visible row and the rendered window unchanged. Observed root size changes update measurements where `ResizeObserver` is available; arbitrary layout changes are not continuously tracked.

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

## Lifecycle

### Lifecycle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `data` | Data consumed by item slot | Lifecycle |
| `virtual-list-props` | Data virtualization; ignored when default slot exists | Lifecycle |
<!-- demo-config-notes:end -->


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

## API

The virtual list covers the viewport first and renders `buffer` items beyond it on each side. `buffer=0` is valid. `estimatedSize` must be finite and positive, including values below 1; invalid values fall back to 30px. `fixedSize` can change dynamically. Variable-height mode uses measured and estimated heights and observes mounted measurable roots when `ResizeObserver` is available. The `item` slot receives the original index and unknown data; it may return multiple measurable roots, whose combined bounds are measured as one item. Provide a stable `itemKey`. To convey the complete collection to assistive technology, provide `aria-setsize` and `aria-posinset` on application rows as appropriate.

Server rendering currently fails when `v-for` and `v-memo` occur on the same node inside the `default`, `header`, `footer`, `empty` or `item` slot, with or without virtualization in data mode. As a temporary workaround, remove `v-memo` from that node and verify the update behavior.

### List Props

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

Virtual lists use a dedicated viewport without nesting a custom scrollbar. virtualListProps.height overrides maxHeight; with neither, height defaults to 200px. Numeric and unit-bearing CSS lengths are accepted. Invalid/nonpositive max-height does not constrain height.

ListVirtualListProps supports height, threshold, fixedSize, estimatedSize, buffer, itemKey and component. List.data supplies data. Counts at or below threshold render all items. Variable heights use measurements and estimatedSize; buffer controls overscan rows.

ListScrollbarProps supports type: 'track'|'embed', outerClass, outerStyle, hide, disableHorizontal and disableVertical. JavaScript object fields use camelCase.

### List Events / Methods

- scroll(event: Event): one notification per real scroll event.
- scrollIntoView({ index?, key?, align }): virtual-list positioning. index overrides key; align is top/bottom/auto. auto does nothing for a fully visible item, otherwise scrolls the minimum distance required. Invalid targets or nonvirtual mode do nothing.

### List Slots

List slots: default (overrides data), item({ item, index }), header, footer, empty. Empty state appears only without a default slot/data and while not loading. ListItem prefix/default/suffix retain list-item semantics without managing buttons/business interactions.

## Types

ListProps、ListSize、ListVirtualListProps、ListScrollbarProps、ListExpose、ListSlots、ListEmits、ListInstance、ListItemInstance。

List handles display and an optional virtual viewport. Compose InfiniteScroll status/target behavior for pagination rather than duplicating its loading state machine inside List.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-list-background` | `var(--mp-color-bg-1)` | `background` |
| `--mp-list-border-color` | `var(--mp-color-border-2)` | `border`, `border-bottom`, `border-top` |
| `--mp-list-border-radius` | `4px` | `border-radius` |
| `--mp-list-border-width` | `1px` | `border`, `border-bottom`, `border-top` |
| `--mp-list-empty-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-list-empty-padding` | `24px 16px` | `padding` |
| `--mp-list-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-list-font-size-header` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-list-font-weight-header` | `500` | `font-weight` |
| `--mp-list-item-prefix-margin-right` | `12px` | `margin-inline-end` |
| `--mp-list-item-suffix-margin-left` | `12px` | `margin-inline-start` |
| `--mp-list-line-height` | `1.5` | `line-height` |
| `--mp-list-line-height-header` | `1.5` | `line-height` |
| `--mp-list-loading-padding` | `16px` | `padding` |
| `--mp-list-size-lg-padding-horizontal-footer` | `16px` | `padding` |
| `--mp-list-size-lg-padding-horizontal-header` | `16px` | `padding` |
| `--mp-list-size-lg-padding-horizontal-item` | `20px` | `padding` |
| `--mp-list-size-lg-padding-vertical-footer` | `12px` | `padding` |
| `--mp-list-size-lg-padding-vertical-header` | `12px` | `padding` |
| `--mp-list-size-lg-padding-vertical-item` | `16px` | `padding` |
| `--mp-list-size-md-padding-horizontal-footer` | `16px` | `padding` |
| `--mp-list-size-md-padding-horizontal-header` | `16px` | `padding` |
| `--mp-list-size-md-padding-horizontal-item` | `16px` | `padding` |
| `--mp-list-size-md-padding-vertical-footer` | `12px` | `padding` |
| `--mp-list-size-md-padding-vertical-header` | `12px` | `padding` |
| `--mp-list-size-md-padding-vertical-item` | `12px` | `padding` |
| `--mp-list-size-sm-padding-horizontal-footer` | `16px` | `padding` |
| `--mp-list-size-sm-padding-horizontal-header` | `16px` | `padding` |
| `--mp-list-size-sm-padding-horizontal-item` | `12px` | `padding` |
| `--mp-list-size-sm-padding-vertical-footer` | `12px` | `padding` |
| `--mp-list-size-sm-padding-vertical-header` | `12px` | `padding` |
| `--mp-list-size-sm-padding-vertical-item` | `8px` | `padding` |
| `--mp-list-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-list-text-color-header` | `var(--mp-color-text-1)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-list-background: var(--mp-color-bg-1);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
