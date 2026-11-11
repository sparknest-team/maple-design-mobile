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
### Col Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Column span; integer 0–24, with zero hiding the column | `number` | `24` |
| offset | Offset from the logical inline start; integer 0–24, with zero restoring it | `number` | `undefined` |
| order | Visual order; finite integer, including negative values; zero restores it | `number` | `undefined` |
| xs | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| sm | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| md | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| lg | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xxl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| flex | Ratio, fixed length or CSS flex value | `number / string` | `undefined` |

### Col Events

| Event | Description |
| --- | --- |
| click | Native MouseEvent, emitted once per click |

### Col Slots

| Slot | Description |
| --- | --- |
| default | Layout content |

### Col Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

The order example restores every column to `order: 0` when reverse is turned off. Responsive breakpoints use the browser viewport rather than the demo card width; widening the card alone does not activate a breakpoint. `span: 0` hides a column, and a matching larger breakpoint can restore it.

## Responsiveness and accessibility

Row resolves responsive gutter with JavaScript matchMedia, using xs for SSR and synchronizing the viewport after mounting. Col uses CSS media queries: SSR already emits all configured classes without waiting for measurement. Breakpoints use viewport width: xs is the base; sm ≥576, md ≥768, lg ≥992, xl ≥1200 and xxl ≥1600px. Only configured fields override earlier values. Offset starts at the logical inline edge and mirrors in RTL. Order affects visual positioning while preserving DOM, keyboard and assistive technology reading order.

Span, offset and their breakpoint fields accept integers from 0 through 24. A zero span hides the column; offset 24 shifts it by a full row width. Order accepts finite integers, including negative values and values above 24, subject to browser CSS order computation. Gutter accepts finite nonnegative numbers, six-breakpoint objects or exactly two entries [horizontal, vertical]. Development diagnostics report unknown breakpoints, invalid numbers and enum values. Invalid span falls back to 24; invalid offset/order is ignored; breakpoint objects retain valid fields; invalid gutter components fall back to zero.

## Imports

Grid contains only Grid.Item. Import the independent Row and Col components from the library root or their row/col subpaths; installing Grid does not register them. 

`flex` overrides column width while preserving `offset`, `order` and responsive configuration. `span: 0`, including breakpoint values, still hides the column; a matching nonzero span restores visibility while `flex` controls width. Removing `flex` restores the span width. Visual ordering does not change DOM or keyboard navigation `order`.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
