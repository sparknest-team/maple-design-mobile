# Col

24-column Flex layout. Row manages gutters and alignment; Col manages spans, offsets, ordering and breakpoints. Use Grid for CSS Grid collapse and suffix items.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Basic examples

### Span and offset

```demo
../example/demos/basic.vue
```

## Layout and arrangement

### Flexible ratios and fixed widths

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `flex` | Ratio, fixed length or CSS flex value | Flexible ratios and fixed widths |
| `xs` | Responsive span or object containing span, offset and order | Responsive objects and visibility |
| `sm` | Responsive span or object containing span, offset and order | Responsive objects and visibility |
| `md` | Responsive span or object containing span, offset and order | Responsive objects and visibility |
| `span` | Column span; 0 hides | Responsive objects and visibility |
<!-- demo-config-notes:end -->


```demo
../example/demos/flex.vue
```

### Responsive objects and visibility


```demo
../example/demos/responsive.vue
```

## Content and presentation

### Ordering and resetting to zero

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `span` | Column span; 0 hides | Ordering and resetting to zero |
| `order` | Order; 0 resets | Ordering and resetting to zero |
<!-- demo-config-notes:end -->


```demo
../example/demos/order.vue
```

## API

<!-- same-source-api:start -->
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

The order example restores every column to `order: 0` when reverse is turned off. Responsive breakpoints use the browser viewport rather than the demo card width; widening the card alone does not activate a breakpoint. `span: 0` hides a column, and a matching larger breakpoint can restore it.

## Responsiveness and accessibility

Breakpoints use the browser viewport: xs is the base; sm ≥576, md ≥768, lg ≥992, xl ≥1200 and xxl ≥1600px. Configured values resolve downward from the largest matching breakpoint. SSR starts with xs and responds to the viewport after mounting. Grid collapsing and dynamic ordering are calculated after mounting. These layout containers add no keyboard shortcuts; callers supply content semantics and focusable elements. There are no public methods or dedicated theme tokens.

## Imports

Grid contains only Grid.Item. Row and Col are independent components with their own source, styles, navigation, documentation and demos. Grid.Row/Grid.Col, Row/Col re-exports from Grid and GridRowInstance/GridColInstance are removed. Import them from the library root or separate row/col entries. Installing Grid no longer registers Row/Col automatically.
