# List

VirtualList lifecycle audit: superseded requests, changed data, deactivation and disposal invalidate old nextTick corrections; retained inactive/disposed commands are inert and activation does not replay old work. Corrections are not RAF interpolation and introduce no CSS token/API. All15 scoped cases per copy pass; full List Cedar41/Maple34. New real browser cases:0. Existing key/index/align and measurement contracts remain. The classification note below is historical.

```demo
../example/demos/en-US/virtual-lifecycle.vue
```

`scrollIntoView` forwards options to the internal VirtualList `scrollTo` only in virtual mode; it is not a direct native DOM scrollIntoView or a local motion timer. Native scrolling, preferences and retained-command lifecycle require a separate VirtualList consumer audit. Source hints are not visual acceptance; this classification changes no List API/implementation.

A presentational list. Compose it with `InfiniteScroll` for pagination.



### basic usage

```demo
../example/demos/basic-usage.vue
```

### manual usage

```demo
../example/demos/manual-usage.vue
```

### states

```demo
../example/demos/states.vue
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

```demo
../example/demos/en-US/bounded-scroll.vue
```

### Virtual navigation

```demo
../example/demos/en-US/virtual-navigation.vue
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
