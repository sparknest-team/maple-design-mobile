# Col

24-column Flex layout. Row manages gutters and alignment; Col manages spans, offsets, ordering and breakpoints. Use Grid for CSS Grid collapse and suffix items.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Examples

### Span and offset

```demo
../example/demos/basic.vue
```

### Ordering and resetting to zero

```demo
../example/demos/order.vue
```

### Flexible ratios and fixed widths

```demo
../example/demos/flex.vue
```

### Responsive objects and visibility



<!-- same-source-api:start -->

```demo
../example/demos/responsive.vue
```

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Column span; 0 hides | `number` | `24` |
| offset | Offset; 0 resets | `number` | `undefined` |
| order | Order; 0 resets | `number` | `undefined` |
| xs | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| sm | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| md | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| lg | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xxl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| flex | Ratio, fixed length or CSS flex value | `number / string` | `undefined` |

### Events

| Event | Description |
| --- | --- |
| click | Native MouseEvent, emitted once per click |

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

## Imports

Grid only owns Grid.Item. Row and Col are standalone components with independent entries, styles, documentation, menus and demos. Grid.Row/Grid.Col, Grid re-exports of Row/Col and GridRowInstance/GridColInstance are removed. Import from the library root or standalone row/col entries. Installing Grid no longer registers Row/Col.
