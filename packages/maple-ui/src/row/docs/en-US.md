# Row

24-column Flex layout. Row manages gutters and alignment; Col manages spans, offsets, ordering and breakpoints. Use Grid for CSS Grid collapse and suffix items.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.


Horizontal and vertical gutters both default to 16px (`gutter=[16, 16]`). An explicit number or responsive object sets only the horizontal gutter. Use a tuple for both axes, or `gutter=0` to remove spacing.

## Basic examples

### 24-column layout

```demo
../example/demos/basic.vue
```

## Layout and arrangement

### Two-axis and responsive gutters

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `gutter` | Gutter: number, responsive object or [horizontal, vertical] | Two-axis and responsive gutters, Horizontal and vertical alignment, Wrapping and plain container mode |
| `justify` | Horizontal alignment | Horizontal and vertical alignment, Layout and alignment |
| `align` | Vertical alignment | Horizontal and vertical alignment, Layout and alignment |
| `wrap` | Wrap columns | Wrapping and plain container mode |
| `div` | Use Row and Col as plain divs without layout styles | Wrapping and plain container mode |
<!-- demo-config-notes:end -->


```demo
../example/demos/gutter.vue
```

### Horizontal and vertical alignment

```demo
../example/demos/alignment.vue
```

### Wrapping and plain container mode

```demo
../example/demos/wrap.vue
```

### Nested rows and isolated gutters


```demo
../example/demos/nested.vue
```

### Layout and alignment

Use this example for row. Adjust cross-axis alignment, main-axis distribution and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/layout-lab.vue
```

## API

<!-- same-source-api:start -->
### Row Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| gutter | Gutter: number, responsive object or [horizontal, vertical] | `RowGutter` | `[16, 16]` |
| justify | Horizontal alignment | `start / center / end / space-around / space-between` | `start` |
| align | Vertical alignment | `start / center / end / stretch` | `start` |
| wrap | Wrap columns | `boolean` | `true` |
| div | Use Row and Col as plain divs without layout styles | `boolean` | `false` |

### Row Events

| Event | Description |
| --- | --- |
| click | Native MouseEvent, emitted once per click |

### Row Slots

| Slot | Description |
| --- | --- |
| default | Layout content |

### Row Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

Wrapping examples compare wrapped and ordinary `div` modes. Ordinary mode removes Row layout and child Col spacing. Gap examples distinguish horizontal/vertical spacing. Row uses Flex, not CSS Grid.

## Responsiveness and accessibility

Row resolves responsive gutter with JavaScript matchMedia, using xs for SSR and synchronizing the viewport after mounting. Col uses CSS media queries: SSR already emits all configured classes without waiting for measurement. Breakpoints use viewport width: xs is the base; sm ≥576, md ≥768, lg ≥992, xl ≥1200 and xxl ≥1600px. Only configured fields override earlier values. Offset starts at the logical inline edge and mirrors in RTL. Order affects visual positioning while preserving DOM, keyboard and assistive technology reading order.

Span, offset and their breakpoint fields accept integers from 0 through 24. A zero span hides the column; offset 24 shifts it by a full row width. Order accepts finite integers, including negative values and values above 24, subject to browser CSS order computation. Gutter accepts finite nonnegative numbers, six-breakpoint objects or exactly two entries [horizontal, vertical]. Development diagnostics report unknown breakpoints, invalid numbers and enum values. Invalid span falls back to 24; invalid offset/order is ignored; breakpoint objects retain valid fields; invalid gutter components fall back to zero.

## Imports

Grid contains only Grid.Item. Import the independent Row and Col components from the library root or their row/col subpaths; installing Grid does not register them.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
