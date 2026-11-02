# List

A presentational list. Compose it with `InfiniteScroll` for pagination.

## Basic examples

### basic usage

```demo
../example/demos/basic-usage.vue
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


```demo
../example/demos/states.vue
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


```demo
../example/demos/en-US/bounded-scroll.vue
```

### Virtual navigation

The demo uses `Space direction="column"` to place controls above a full-width list. `estimatedSize` estimates unmeasured rows; application rows do not need a fixed height.

Navigation uses rendered row bounds when available and updates virtual padding after measurement. Programmatic scroll events preserve the current alignment while rendering rows; a different native scroll position, a new command, data replacement, deactivation or disposal cancels its deferred correction. `auto` leaves a fully visible row and the rendered window unchanged. This does not promise continuous tracking of arbitrary asynchronous row resizing.

```demo
../example/demos/en-US/virtual-navigation.vue
```

### manual usage

```demo
../example/demos/manual-usage.vue
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


```demo
../example/demos/en-US/virtual-lifecycle.vue
```

`scrollIntoView` forwards options to the internal VirtualList `scrollTo` only in virtual mode; it is not a direct native DOM scrollIntoView or a local motion timer. Native scrolling, preferences and retained-command lifecycle require a separate VirtualList consumer audit. Source hints are not visual acceptance; this classification changes no List API/implementation.

## API

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

ListVirtualListProps supports height, threshold, fixedSize, estimatedSize, buffer, itemKey and component. Removed isStaticItemHeight is unsupported; List.data supplies data. Counts at or below threshold render all items. Variable heights use measurements and estimatedSize; buffer controls overscan rows.

ListScrollbarProps supports type: 'track'|'embed', outerClass, outerStyle, hide, disableHorizontal and disableVertical. JavaScript object fields use camelCase.

### Events / Methods

- scroll(event: Event): one notification per real scroll event.
- scrollIntoView({ index?, key?, align }): virtual-list positioning. index overrides key; align is top/bottom/auto. auto does nothing for a fully visible item, otherwise scrolls the minimum distance required. Invalid targets or nonvirtual mode do nothing.

### Slots

List slots: default (overrides data), item({ item, index }), header, footer, empty. Empty state appears only without a default slot/data and while not loading. ListItem prefix/default/suffix retain list-item semantics without managing buttons/business interactions.

### Types

ListProps、ListSize、ListVirtualListProps、ListScrollbarProps、ListExpose、ListSlots、ListEmits、ListInstance、ListItemInstance。

List handles display and an optional virtual viewport. Compose InfiniteScroll status/target behavior for pagination rather than duplicating its loading state machine inside List.

## Style variables

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
