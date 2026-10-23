# Grid

CSS Grid columns, spans, gaps, collapse and suffix items. Use Row / Col for 24-column Flex layouts.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Examples

### Columns, spans and offsets

```demo
../example/demos/basic.vue
```

### Collapsed rows and suffix slot

The parent owns collapsed state and row count; More/Less and the switch update the same state. With four columns, one collapsed row shows three items plus the suffix; two rows show seven plus the suffix. Expanding shows all nine items plus the suffix. The suffix occupies a grid position rather than floating over content.

```demo
../example/demos/collapse.vue
```

### Responsive columns, gaps and spans

```demo
../example/demos/responsive.vue
```

### Insert, remove and reorder

Buttons only update this demo's array. Removing all items disables Remove first and changes the suffix to End. Inserting again restores the layout and removal control; Grid does not emit business-level insert/remove events.


```demo
../example/demos/dynamic.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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

## Responsive behavior and accessibility

Breakpoints use the viewport: xs is the baseline, sm ≥576, md ≥768, lg ≥992, xl ≥1200, xxl ≥1600px. Values cascade from the largest matching configured breakpoint. SSR uses xs; the viewport and Grid collapse/reordering are resolved after mount. These layout containers add no keyboard shortcuts; consumers provide semantic content and focusable controls. No public methods or dedicated theme tokens.

## GridItem

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Grid span | number / ResponsiveValue | 1 |
| offset | Empty tracks before the item | number / ResponsiveValue | 0 |
| suffix | Suffix at the end of the row | boolean | false |

The default slot receives `{ overflow: boolean }`, indicating hidden items. No custom events or public methods.

## Imports

Grid only owns Grid.Item. Row and Col are standalone components with independent entries, styles, documentation, menus and demos. Grid.Row/Grid.Col, Grid re-exports of Row/Col and GridRowInstance/GridColInstance are removed. Import from the library root or standalone row/col entries. Installing Grid no longer registers Row/Col.
