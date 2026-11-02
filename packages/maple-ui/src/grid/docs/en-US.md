# Grid

CSS Grid columns, spans, gaps, collapse and suffix items. Use Row / Col for 24-column Flex layouts.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Basic examples

### Columns, spans and offsets

```demo
../example/demos/basic.vue
```

## Layout and arrangement

### Responsive columns, gaps and spans

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `cols` | Columns per row, minimum 1 | Responsive columns, gaps and spans |
| `col-gap` | Column gap in px | Responsive columns, gaps and spans |
| `row-gap` | Row gap in px | Responsive columns, gaps and spans |
<!-- demo-config-notes:end -->


```demo
../example/demos/responsive.vue
```

## Customization and slots

### Collapsed rows and suffix slot

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `cols` | Columns per row, minimum 1 | Collapsed rows and suffix slot |
| `col-gap` | Column gap in px | Collapsed rows and suffix slot |
| `row-gap` | Row gap in px | Collapsed rows and suffix slot |
| `collapsed` | Collapse overflowing rows | Collapsed rows and suffix slot |
| `collapsed-rows` | Visible rows while collapsed, minimum 1 | Collapsed rows and suffix slot |
<!-- demo-config-notes:end -->


The parent owns collapsed state and row count; More/Less and the switch update the same state. With four columns, one collapsed row shows three items plus the suffix; two rows show seven plus the suffix. Expanding shows all nine items plus the suffix. The suffix occupies a grid position rather than floating over content.

```demo
../example/demos/collapse.vue
```

## Interaction and control

### Insert, remove and reorder

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `cols` | Columns per row, minimum 1 | Insert, remove and reorder |
| `col-gap` | Column gap in px | Insert, remove and reorder |
| `row-gap` | Row gap in px | Insert, remove and reorder |
| `collapsed` | Collapse overflowing rows | Insert, remove and reorder |
<!-- demo-config-notes:end -->


Buttons only update this demo's array. Removing all items disables Remove first and changes the suffix to End. Inserting again restores the layout and removal control; Grid does not emit business-level insert/remove events.


```demo
../example/demos/dynamic.vue
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| cols | Columns per row, minimum 1 | `number / ResponsiveValue` | `24` |
| row-gap | Row gap in px | `number / ResponsiveValue` | `0` |
| col-gap | Column gap in px | `number / ResponsiveValue` | `0` |
| collapsed | Collapse overflowing rows | `boolean` | `false` |
| collapsed-rows | Visible rows while collapsed, minimum 1 | `number` | `1` |

### Events

| Event | Description |
| --- | --- |

### Slots

| Slot | Description |
| --- | --- |
| default | Layout content |

### Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

## Responsiveness and accessibility

Breakpoints use the browser viewport: xs is the base; sm ≥576, md ≥768, lg ≥992, xl ≥1200 and xxl ≥1600px. Configured values resolve downward from the largest matching breakpoint. SSR starts with xs and responds to the viewport after mounting. Grid collapsing and dynamic ordering are calculated after mounting. These layout containers add no keyboard shortcuts; callers supply content semantics and focusable elements. There are no public methods or dedicated theme tokens.

## GridItem

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Grid span | number / ResponsiveValue | 1 |
| offset | Empty tracks before the item | number / ResponsiveValue | 0 |
| suffix | Suffix at the end of the row | boolean | false |

The default slot receives `{ overflow: boolean }`, indicating whether collapsing hides content. No custom events or public methods.

## Imports

Grid contains only Grid.Item. Row and Col are independent components with their own source, styles, navigation, documentation and demos. Grid.Row/Grid.Col, Row/Col re-exports from Grid and GridRowInstance/GridColInstance are removed. Import them from the library root or separate row/col entries. Installing Grid no longer registers Row/Col automatically.
